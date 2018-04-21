import mysql from "mysql";
import $ from "jquery";
import { roller } from "./rollerOgEventMal.js";

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
      connection.query("SELECT * FROM bruker WHERE epost = ? AND godkjent = 1", [epost], (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (result.length === 1 && passord === result[0].passord) {
          localStorage.setItem("loggetInnBruker", JSON.stringify(result[0]));
          resolve();
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
      connection.query(
        "SELECT * FROM bruker WHERE godkjent = 1 AND fornavn like ? OR etternavn like ? OR tlf like ? OR adresse like ?  ",
        ["%" + input + "%", "%" + input + "%", "%" + input + "%", "%" + input + "%"],
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

  brukerLoggetInn() {
    let item = localStorage.getItem("loggetInnBruker"); // Get User-object from browser
    if (!item) return null;

    return JSON.parse(item);
  }

  hentIkkeGodkjenteBrukere() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM bruker WHERE godkjent = 0", (error, result) => {
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
      connection.query("SELECT * FROM postkode WHERE postSted = ? AND postNr = ?", [object.postSted, object.postNr], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (result.length === 1) {
          let newOldAddress = result[0].postkodeID;
          connection.query(
            "UPDATE bruker SET etternavn=?, fornavn=?, epost=?, passord=?, tlf=?, adresse=?, postkodeID=? WHERE brukerID=?",
            [object.etternavn, object.fornavn, object.epost, object.passord, object.tlf, object.adresse, newOldAddress, object.brukerID],
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            }
          );
        } else {
          connection.query("INSERT INTO postkode (postSted, postNr) VALUES (?,?);", [object.postSted, object.postNr], (error, result) => {
            if (error) {
              reject(error);
            } else {
              // Make user with new postkode.
              let nyAdresseID = result.insertId;
              connection.query(
                "UPDATE bruker SET etternavn=?, fornavn=?, epost=?, passord=?, tlf=?, adresse=?, postkodeID=? WHERE brukerID=?",
                [object.etternavn, object.fornavn, object.epost, object.passord, object.telefon, object.adresse, nyAdresseID, object.brukerID],
                (error, result) => {
                  if (error) {
                    reject(error);
                    return;
                  }
                  resolve(result);
                }
              );
            }
          });
        }
      });
    });
  }

  hentBruker(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM bruker b, postkode p WHERE b.brukerID = ? AND b.postkodeID = p.postkodeID", [id], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  }

  sendKvali(id, rolle, dato) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO kvali (brukerID, kvaliType, utlopsDato) VALUES (?,?,?)", [id, rolle, dato], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  hentKvali(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM kvali WHERE brukerID = ? ", [id], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        for (let x of result) {
          let v = new Date();
          if (x.utlopsDato <= v) {
            result.splice(result.indexOf(x), 1);
            continue;
          }
          x.utlopsDato = x.utlopsDato.toDateString();
        }
        resolve(result);
      });
    });
  }

  removeKvali(id) {
    return new Promise((resolve, reject) => {
      connection.query("DELETE FROM kvali WHERE kvaliID = ?", [id], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  }

  isSubArray(subArray, array) {
    for (let i = 0; i < subArray.length; i++) {
      if ($.inArray(subArray[i], array) === -1) {
        return false;
      }
    }
    return true;
  }

  hentRolle(id) {
    return new Promise((resolve, reject) => {
      let muligRolle = [];
      this.hentKvali(id).then(result => {
        let kvaliArray = [];
        for (let kvali of result) {
          kvaliArray.push(kvali.kvaliType);
        }
        for (let rolle of roller) {
          if (this.isSubArray(rolle.krav, kvaliArray) || kvaliArray === rolle.krav) {
            muligRolle.push(rolle.key);
          }
        }

        resolve(muligRolle);
      });
    });
  }
}

class EventQueries {
  hentEvent(id) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM events WHERE eventID = ?", [id], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        let v = new Date();
        v = v.getDate() + "." + (v.getMonth() + 1) + "." + v.getFullYear();
        result.forEach(x => {
          if (x > v) {
            x.eventDatoSlutt = x.eventDatoSlutt.getDate() + "." + (x.eventDatoSlutt.getMonth() + 1) + "." + x.eventDatoSlutt.getFullYear();
            x.eventDatoStart = x.eventDatoStart.getDate() + "." + (x.eventDatoStart.getMonth() + 1) + "." + x.eventDatoStart.getFullYear();
          }
        });
        resolve(result);
      });
    });
  }

  hentEvents() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM events WHERE godkjent = 1", (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        let v = new Date();
        v = v.getDate() + "." + (v.getMonth() + 1) + "." + v.getFullYear();
        result.forEach(x => {
          if (x > v) {
            x.eventDatoSlutt = x.eventDatoSlutt.getDate() + "." + (x.eventDatoSlutt.getMonth() + 1) + "." + x.eventDatoSlutt.getFullYear();
            x.eventDatoStart = x.eventDatoStart.getDate() + "." + (x.eventDatoStart.getMonth() + 1) + "." + x.eventDatoStart.getFullYear();
          }
        });
        resolve(result);
      });
    });
  }

  hentIkkeGodkjentEvents() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM events WHERE godkjent = 0", (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        let v = new Date();
        v = v.getDate() + "." + (v.getMonth() + 1) + "." + v.getFullYear();
        result.forEach(x => {
          if (x > v) {
            x.eventDatoSlutt = x.eventDatoSlutt.getDate() + "." + (x.eventDatoSlutt.getMonth() + 1) + "." + x.eventDatoSlutt.getFullYear();
            x.eventDatoStart = x.eventDatoStart.getDate() + "." + (x.eventDatoStart.getMonth() + 1) + "." + x.eventDatoStart.getFullYear();
          }
        });

        resolve(result);
      });
    });
  }

  createNewEvent(object) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO events (eventNavn, eventPlass, eventDatoStart, eventDatoSlutt, informasjon, eventKey) VAlUES (?,?,?,?,?,?)",
        [object.Navn, object.Lokasjon, object.dato_start, object.dato_slutt, object.annen_info, object.eventKey],
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

  godkjenning(ID, table, bool) {
    return new Promise((resolve, reject) => {
      // If bool (which stands for add or not, where true is add, then do if
      if (bool) {
        //If the table is event then do this
        if (table === event) {
          connection.query("UPDATE events SET godkjent = 1 WHERE eventID = ?", [ID], (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve();
          });
        } else {
          connection.query("UPDATE bruker SET godkjent = 1 WHERE brukerID = ?", [ID], (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve();
          });
        }
      } else {
        if (table === event) {
          connection.query("DELETE FROM events WHERE eventID= ?", [ID], (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve();
          });
        } else {
          connection.query(
            "INSERT INTO ikkeBruker (brukerID, epost, fornavn, etternavn, passord, adresse, tlf, godkjent, adminStat, poeng) " +
              "SELECT brukerID, epost, fornavn, etternavn, passord, adresse, tlf, godkjent, adminStat, poeng FROM bruker  WHERE brukerID = ?",
            [ID],
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }
              connection.query("DELETE FROM bruker WHERE brukerID = ?", [ID], (error, result) => {
                if (error) {
                  reject(error);
                  return;
                }
                resolve();
              });
            }
          );
        }
      }
    });
  }

  joinEvent(eventID, brukerID, rolle) {
    return new Promise((resolve, reject) => {
      this.hentDeltakere(eventID).then(result => {
        result.forEach(x => {
          if (x.brukerID === brukerID) {
            reject();
          }
        });
      });
      connection.query("INSERT INTO deltakelse (brukerID, eventID, deltarSom,  mottatPoeng) VALUES (?,?,?,1) ", [brukerID, eventID, rolle], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  hentDeltakere(eventID) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM deltakelse d, bruker b WHERE d.eventID = ? AND b.brukerID = d.brukerID", [eventID], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  }
}

let queries = new Queries();
let eventQueries = new EventQueries();
export { eventQueries, queries };
