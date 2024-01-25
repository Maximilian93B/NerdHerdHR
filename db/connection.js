// Import mysql12 and create connection 
const mysql = require('mysql2');


const connection = mysql.createConnection({
 
    host: 'localhost', 
    user: 'root', 
    password: 'adminroot',
    database: 'nerdherd_db'
});


connection.connect(err => {
    if (err) throw err; 
    console.log ('Step aside, Let the Nerds Cook');
});

module.exports = connection; 