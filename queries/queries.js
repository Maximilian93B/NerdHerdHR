// import connection 

const db = require('../db/connection');

// Get all employees 

function getsAllEmployees() {
    return new Promise((resolve, reject) => {
        console.log('About to start query!')
        const query = `SELECT * FROM nerdherd_db.employee;`;
        connection.query(query, (err, results) => {
            console.log('Connection made');
            if (err) reject(err);
            resolve(results);
        });
    });
}

module.exports = { getsAllEmployees }; 
