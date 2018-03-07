import mysql from 'mysql';

// Setup database server reconnection when server timeouts connection:
let connection;
function connect() {
  connection = mysql.createConnection({
    host: 'mysql.stud.iie.ntnu.no',
    user: 'g_oops_3',
    password: 'rb8BFX1X',
    database: 'g_oops_3'
  });

  // Connect to MySQL-server
  connection.connect((error) => {
    if (error) throw error; // If error, show error in console and return from this function
    console.log('We are connected');
  });

  // Add connection error handler
  connection.on('error', (error) => {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') { // Reconnect if connection to server is lost
      connect();
    }
    else {
      throw error;
    }
  });
}
connect();

// Class that performs database queries related to customers
class Queries {
    loginQuery(epost, passord) {
        connection.query('SELECT * FROM bruker WHERE epost = ?', [epost], (error, result) => {
            if (error) throw error;

            if (result.length === 1 && passord === result[0].passord) {
                console.log("You're in...");
            }
            else {
                console.log("HACKER...")
            }

        })
    }

    newUserQuery(object) {
        connection.query('SELECT * FROM bruker WHERE epost = ?', [object.epost], (error, result) =>{
            if(error) throw error;

            if(result.length === 1 && object.epost === result[0].epost) {
                console.log('Already a user there...')
            }
            else {
                connection.query('INSERT INTO bruker (epost, etternavn, fornavn, passord, address, tlf) VALUES (?,?,?,?,?,?)', [object.epost, object.etternavn, object.fornavn, object.passord, object.address, object.telefon], (error, result) => {
                    if (error) throw error;
                    else {
                        console.log('Added a new person...')
                    }
                })
            }
        })
    }
}

let queries = new Queries();
export {queries}
