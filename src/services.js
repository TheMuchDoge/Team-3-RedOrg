import mysql from "mysql";
import $ from "jquery";
import {roller} from "./rollerOgEventMal.js";

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
    // Login query som henter bruker basert på eposten, og sjekker om resultatet har samme passord, hvis ikke så reject.
  loginQuery(epost, passord) {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM bruker WHERE epost = ? AND godkjent = 1", [epost], (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (result.length === 1 && passord === result[0].passord) {
            localStorage.setItem("loggetInnBruker", JSON.stringify(result[0]));
            resolve(result[0].brukerID);
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
                "INSERT INTO bruker (epost, etternavn, fornavn, passord, tlf, adresse, postkodeID, adminStat) VALUES (?,?,?,?,?,?,?,?)",
                [object.epost, object.etternavn, object.fornavn, object.passord, object.telefon, object.adresse, adresseID, object.adminStat],
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
                    "INSERT INTO bruker (epost, etternavn, fornavn, passord, tlf, adresse, postkodeID, adminStat) VALUES (?,?,?,?,?,?,?,?)",
                    [object.epost, object.etternavn, object.fornavn, object.passord, object.telefon, object.adresse, nyAdresseID, object.adminStat],
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
      // selvforklarende, sjekker om den finne noe kjent med de brukere som er godkjent.
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM bruker WHERE godkjent = 1 AND fornavn = ? OR etternavn = ? OR tlf = ? OR adresse = ?  ",
          ["%" + input + "%", "%" + input + "%", "%" + input + "%", "%" + input + "%"], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  }

  // Henter logget inn bruker.
  brukerLoggetInn() {
    let item = localStorage.getItem("loggetInnBruker"); // Get User-object from browser
    if (!item) return null;

    return JSON.parse(item);
  }

  // Henter alle brukere som ikke har blitt godkjent og sender result arreyet vidre.
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

  // Sjekker om postkoden og postNr finnes
  updateQuery(object) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM postkode WHERE postSted = ? AND postNr = ?", [object.postSted, object.postNr], (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            // hvis den finnes så bruker den id til å legge det i updaten av brukern.
            if (result.length === 1){
                let newOldAddress = result[0].postkodeID;
                connection.query(
                    "UPDATE bruker SET etternavn=?, fornavn=?, epost=?, passord=?, tlf=?, adresse=?, postkodeID=? WHERE brukerID=?",
                    [object.etternavn, object.fornavn, object.epost, object.passord, object.tlf, object.adresse, newOldAddress,  object.brukerID],
                    (error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(result);
                    }
                );

            }
            else{
                // Legger til ny postkode og postNr
                connection.query("INSERT INTO postkode (postSted, postNr) VALUES (?,?);", [object.postSted, object.postNr], (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        // Make user with new postkode.
                        let nyAdresseID = result.insertId;
                        // Oppdatere så brukern.
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
                })
            }
        })

    });
  }

  // henter bruker basert på id
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

  // legger til kvalifikasjoner i kvali tabellen
  sendKvali(id, kvali, dato) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO kvali (brukerID, kvaliType, utlopsDato) VALUES (?,?,?)", [id,kvali,dato], (error, result) => {
          if (error) {
              reject(error);
              return;
          }
          resolve();
      })
    })
    }

    // Henter alle kvalifikasjoner på en bruker
    hentKvali(id) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM kvali WHERE brukerID = ? ", [id], (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                result.forEach((x) => {
                    x.utlopsDato = x.utlopsDato.toISOString().substring(0, 10)
                });
                resolve(result);
            })
        })
    }

    // fjerner kvalifikasjoner basert på kvaliID
    removeKvali(id){
      return new Promise((resolve, reject) => {
          connection.query("DELETE FROM kvali WHERE kvaliID = ?",[id],(error, result) => {
              if (error) {
                  reject(error);
                  return;
              }
              resolve();
          })
      })
    }

    // Funksjon som sjekker om en array er en sub array av en større array, men ikke om de er like.
    isSubArray (subArray, array) {
        for(let i = 0; i < subArray.length; i++) {
            if($.inArray(subArray[i], array) === -1) {
                return false;
            }
        }
        return true;
    }

    // henter alle kvalifikasjoner fra db-en, og alle roller fra external fil.
    hentRolle(id) {
      return new Promise ((resolve, reject) => {
           let muligRolle = [];
           this.hentKvali(id).then((result) => {

               let kvaliArray = [];
               for (let kvali of result) {
                   kvaliArray.push(kvali.kvaliType);
               }
               // Sjekker om brukeren har kvalifikasjonene til en og hver rolle.
                for (let rolle of roller) {
                    if((this.isSubArray(rolle.krav, kvaliArray)) || kvaliArray === rolle.krav) {
                        muligRolle.push(rolle.key);
                    }
                }

               resolve(muligRolle);
            });
      });
    }
    hentPassord(epost) {
      return new Promise((resolve, reject) => {
          connection.query("SELECT passord FROM bruker WHERE epost = ?", [epost], (error, result) => {
              if (error) {
                  reject(error);
                  return;
              }
              resolve(result[0].passord);
          })
      })
    }

    removeBruker(id) {
      return new Promise((resolve, reject) => {

      })
    }


}

class EventQueries {
    // Henter et bestemt event basert på ID
    hentEvent(id, bool) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM events WHERE eventID = ?", [id], (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (bool) {
                // Må endre måten dataen er lagret på for å få godkjent i React.
                    let v = new Date();
                    v = v.toISOString().substring(0, 10);
                    result.forEach((x) => {
                        x.eventDatoSlutt = x.eventDatoSlutt.toISOString().substring(0, 10);
                        x.eventDatoStart = x.eventDatoStart.toISOString().substring(0, 10);
                        if (x.eventDatoStart < v) {
                            result.splice(result.indexOf(x.eventDatoStart), 1)
                        }

                    });
                }
                resolve(result);
            });
        });
    }

    // Henter alle events.
  hentEvents() {
    return new Promise((resolve, reject) => {
        let v = new Date();
      connection.query("SELECT * FROM events WHERE godkjent = 1 AND eventDatoStart > ? ORDER BY eventDatoStart ASC", [v], (error, result) => {
        if (error) {
          reject(error);
          return;
        }
          // Må endre måten dataen er lagret på for å få godkjent i React.


          v = v.toISOString().substring(0, 10);
          for (let x in result) {
              result[x].eventDatoSlutt = result[x].eventDatoSlutt.toISOString().substring(0, 10);
              result[x].eventDatoStart = result[x].eventDatoStart.toISOString().substring(0, 10);
          };
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
          // Må endre måten dataen er lagret på for å få godkjent i React.
        let v = new Date();
        v = v.getDate() +"."+ (v.getMonth()+1)+"."+v.getFullYear();
        result.forEach((x) => {
            if (x > v) {
                x.eventDatoSlutt = x.eventDatoSlutt.getDate() +"."+ (x.eventDatoSlutt.getMonth()+1)+"."+x.eventDatoSlutt.getFullYear();
                x.eventDatoStart = x.eventDatoStart.getDate() +"."+ (x.eventDatoStart.getMonth()+1)+"."+x.eventDatoStart.getFullYear();
            }
        })

        resolve(result);
      });
    });
  }

  // Enkel insert av et nytt event.
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

  // Godkjenning av både events og bruker.
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
                }
                // bruker update, hvis den er godkjent.
                else{
                    connection.query("UPDATE bruker SET godkjent = 1 WHERE brukerID = ?", [ID], (error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve();
                    });
                }
          }
          else {
              if(table === event) {
                  connection.query("DELETE FROM events WHERE eventID= ?", [ID], (error, result) => {
                      if (error) {
                          reject(error);
                          return;
                      }
                      resolve();
                  })
              }
              else {
                  // setter en bruker i en annen tabell for å fortsatt lagre brukern.
                  connection.query("INSERT INTO ikkeBruker (brukerID, epost, fornavn, etternavn, passord, adresse, postkodeID, tlf, godkjent, adminStat, poeng) " +
                      "SELECT brukerID, epost, fornavn, etternavn, passord, adresse, postkodeID, tlf, godkjent, adminStat, poeng FROM bruker WHERE brukerID = ?", [ID], (error, result) => {
                      if (error) {
                          reject(error);
                          return;
                      }
                      // sletter brukern fra bruker tabell sånn at den ikke dukker opp igjen.
                      connection.query("DELETE FROM bruker WHERE brukerID = ?", [ID], (error, result) => {
                          if (error) {
                              reject(error);
                              return;
                          }
                          resolve();
                      })
                  });
              }
          }
        })
      }

// legger deltakelse i deltakelse og legger til et poeng til brukern.
  joinEvent(eventID, brukerID, rolle, poeng) {
        return new Promise ((resolve, reject) => {
            this.hentDeltakere(eventID).then((result) => {
                if (result.length === 0) {
                    connection.query("INSERT INTO deltakelse (brukerID, eventID, deltarSom,  mottatPoeng) VALUES (?,?,?,1) ", [brukerID, eventID, rolle], (error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        let nyPoeng = poeng + 1;
                        connection.query("UPDATE bruker SET poeng = ? WHERE brukerID =? ", [nyPoeng, brukerID], (error, result) => {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve();
                        })
                    })
                }
                else {
                    result.forEach((x) => {
                        if(x.brukerID === brukerID) {
                            reject();
                        }
                        else {
                            connection.query("INSERT INTO deltakelse (brukerID, eventID, deltarSom,  mottatPoeng) VALUES (?,?,?,1) ", [brukerID, eventID, rolle], (error, result) => {
                                if (error) {
                                    reject(error);
                                    return;
                                }
                                let nyPoeng = poeng + 1;
                                connection.query("UPDATE bruker SET poeng = ? WHERE brukerID =? ", [nyPoeng, brukerID], (error, result) => {
                                    if (error) {
                                        reject(error);
                                        return;
                                    }
                                    resolve();
                                })
                            })
                        }
                    })
                }
            })

        })
  }

  // henter alle deltakere til et event, basert på eventID.
  hentDeltakere(eventID) {
        return new Promise ((resolve, reject) => {
            connection.query("SELECT * FROM deltakelse d, bruker b WHERE d.eventID = ? AND b.brukerID = d.brukerID", [eventID], (error, result) =>  {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            })
        })
  }

  updateEvent(object,eventID) {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE events SET eventNavn = ?, eventPlass=?, eventDatoStart=?, eventDatoSlutt=?, informasjon=?, eventKey=? WHERE eventID = ?",
                [object.eventNavn,object.eventPlass,object.eventDatoStart,object.eventDatoSlutt,object.informasjon,object.eventKey,eventID], (error, result) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                })
        })
  }

  removeEvent(id) {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM events WHERE eventID =?", [id], (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
                }
            )
        })
  }

}



let queries = new Queries();
let eventQueries = new EventQueries();
export { eventQueries, queries };