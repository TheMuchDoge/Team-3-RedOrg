import mysql from "mysql";

// Setup database server reconnection when server timeouts connection:
let connection;
function connect() {
  connection = mysql.createConnection({
    host: "mysql.stud.iie.ntnu.no",
    user: "g_oops_3",
    password: "rb8BFX1X",
    database: "g_oops_3"
  });

  // Connect to MySQL-server
  connection.connect(error => {
    if (error) throw error; // If error, show error in console and return from this functioN
  });

  // Add connection error handler
  connection.on("error", error => {
    if (error.code === "PROTOCOL_CONNECTION_LOST" || error.code === "ETIMEDOUT") {
      // Reconnect if connection to server is lost
      connect();
    } else {
      throw error;
    }
  });
}
connect();

// Class of queries, which will be exported for further use.

class Queries {
  loginQuery(epost, passord) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM bruker WHERE epost = ?", [epost], (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (result.length === 1 && passord === result[0].passord) {
          if (result[0].adminStat) {
            localStorage.setItem("loggetInnBruker", JSON.stringify(result[0]));
            resolve();
          } else {
            localStorage.setItem("loggetInnBruker", JSON.stringify(result[0]));
            resolve();
          }
        } else {
          alert("Epost eller passord er feil.");
          reject();
        }
      });
    });
  }

  newUserQuery(object) {
    // A query to check if a user already exist,
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM bruker WHERE epost = ?", [object.epost], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        // If there exists a user with the same email (which is unique), then we log that.-
        if (result.length >= 1 && object.epost === result[0].epost) {
          alert("Eposten er allerede i bruk.");
          reject();
        } else {
          console.log(result);
          //checks if poststed and postnr is in postkoder table, if it is then we use it to make a new user.
          connection.query("SELECT * FROM postkode WHERE postSted = ? AND postNr = ?", [object.poststed, object.postnummer], (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            // If there is a postcode and place name, we use it in a query
            if (result.length > 0) {
              let adresseID = result[0].postkodeID;
              connection.query(
                "INSERT INTO bruker (epost, etternavn, fornavn, passord, tlf, adresse, postkodeID) VALUES (?,?,?,?,?,?,?)",
                [object.epost, object.etternavn, object.fornavn, object.passord, object.telefon, object.adresse, adresseID],
                (error, result) => {
                  if (error) {
                    reject(error);
                    return;
                  } else {
                    resolve();
                  }
                }
              );
            } else {
              // If not, then we make postkode with the user input.
              console.log(result);
              // Adding new postkode.
              connection.query("INSERT INTO postkode (postSted, postNr) VALUES (?,?);", [object.poststed, object.postnummer], (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  // Make user with new postkode.
                  let nyAdresseID = result.insertId;
                  connection.query(
                    "INSERT INTO bruker (epost, etternavn, fornavn, passord, tlf, adresse, postkodeID) VALUES (?,?,?,?,?,?,?)",
                    [object.epost, object.etternavn, object.fornavn, object.passord, object.telefon, object.adresse, nyAdresseID],
                    (error, result) => {
                      if (error) {
                        reject(error);
                        return;
                      } else {
                        resolve();
                      }
                    }
                  );
                }
              });
            }
          });
        }
      });
    });
  }

  searchQuery(input) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM bruker WHERE fornavn = ? OR etternavn = ? OR tlf = ? OR adresse = ?", [input, input, input, input], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  }

  brukerLoggetInn() {
    let item = localStorage.getItem("loggetInnBruker"); // Get User-object from browser
    if (!item) return null;

    return JSON.parse(item);
  }

  hentIkkeGodkjenteBrukere() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM bruker WHERE brukerGodkjent = 0", (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  }

  updateQuery(object) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE bruker SET etternavn=?, fornavn=?, epost=?, passord=?, tlf=?, adresse=? WHERE brukerID=?",
        [object.etternavn, object.fornavn, object.epost, object.passord, object.telefon, object.adresse, object.id],
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      );
    });
  }

  hentBruker(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM bruker WHERE brukerID = ?", [id], (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      });
    });
  }
}

class EventQueries {
  hentEvents() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM events WHERE eventGodkjent = 1", (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  }

  hentIkkeGodkjentEvents() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM events WHERE eventGodkjent = 0", (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  }

  createNewEvent(object) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO events (eventNavn, eventPlass, eventDatoStart, eventDatoSlutt, informasjon) VAlUE (?,?,?,?,?)",
        [object.eventNavn, object.eventPlass, object.eventDatoStart, object.eventDatoSlutt, object.informasjon],
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        }
      );
    });
  }

  godkjenning(eventID, table, bool) {
    return new Promise((resolve, reject) => {
      // If bool (which stands for add or not, where true is add, then do if
      if (bool) {
        //If the table is event then do this
        if (table === event) {
          connection.query("UPDATE events SET eventGodkjent = 1 WHERE eventID = ?", [eventID], (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve();
          });
        } else {
          //Else the table must be bruker, so we add it to godkjent.
          connection.query("UPDATE bruker SET brukerGodkjent = 1 WHERE brukerID = ?", [eventID], (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve();
          });
        }
      } else {
        // it not true, then it send it back
        resolve();
      }
    });
  }
}

let queries = new Queries();
let eventQueries = new EventQueries();
export { eventQueries, queries };
