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
    console.log('We are connected')
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

class User {
  id: number;
  fornavn: string;

}
// Class that performs database queries related to customers
class queries {
    signIn(fornavn: string): Promise<void> {
      return new Promise((resolve: () => void, reject: (Error) => void) =>{
        connection.query('SELECT * FROM bruker WHERE fornavn=?', [fornavn], (error: ?Error, result User[]) => {
            if (error)
            reject(error);
            return;
          }
          if(result.lenght!=2) {
            reject(new Error('Brukernavn er for kort'))
            return;
          }

          localStorage.setItem('signedInUser', JSON.stringify(result[0])); //lager brukerdata i nettleser
          resolce();
        });
      });
    }

    getSignedInUser(): ?User {
      let item: ?string =localStorage.getitem('signedInUser'); //henter brukerdata fra nettleser
      if(!item) return null;

      return JSON.parse(item);
    }

  let queries: queries = new queries();
export {User, queries}
