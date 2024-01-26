// import connection 

 const db = require('../db/connection');

 function getAllEmployees() {
     return new Promise((resolve, reject) => {
         db.query("SELECT * FROM employee;", (err, results) => {
             if (err) {
                 console.error('Error executing getAllEmployees query:', err);
                 reject(err);
             } else {
                 resolve(results);
             }
         });
     });
 }
 
 module.exports = { getAllEmployees };
 
