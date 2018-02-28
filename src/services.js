import mysql from 'mysql';

// Setup database server reconnection when server timeouts connection:
let connection;
function connect() {
  connection = mysql.createConnection({
    host     : 'mysql.stud.iie.ntnu.no',
    user     : 'g_oops_3',
    password : 'rb8BFX1X',
    database : 'g_oops_3'
  });
  
  // Connect to MySQL-server
  connection.connect((error) => {
    if (error) throw error; // If error, show error in console and return from this function
  });
