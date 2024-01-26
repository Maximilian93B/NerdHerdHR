// This file containts all queries made to the db. 
// It is broken down into View, Add , Update , 
// The workflow will take you this way



//                      VIEW FUNCTIONS 

const connection = require('../db/connection.js');

//View Department table function 

function viewDepartments() {
    const query = 'SELECT * FROM department';

    connection.query(query, (err, results)=>{
        if(err){
            console.log ('Whoops! Something happened when trying to View Departments: ' + err);
            return;
        }

        console.table ('\nDepartments:\n');
        console.table(results); // Display results as a table 
    });
}


// View Role Table 

function viewRoles() {
    const query = 'SELECT * FROM role';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Slow your role, Cannot retrieve role data: ' + err);
        return;
      }
  
      console.log('\nRoles:\n');
      console.table(results); // Display results as a table
  
      // Return to the main menu or perform other actions
      // You can call a function here to navigate back to the main menu
    });
  }


// View all Employees 

function viewAllEmployees() {
    const query = 'SELECT * FROM employee';

    connection.query(query, (err, results) => {
        if (err) {
            console.log ('These Employees are lackin, Cannot retireive employee data: ' + err); 
            return;
        }
        console.log('\nEmployees\n');
        console.table(results); // Display Employee table 
    })
}



//                      ADD FUNCTIONS 


// add a Department to db 

function addDepartment(departmentName) {
    const query ='INSERT INTO department (name) VALUE (?)';
    return new Promise ((resolve, reject)=>{
        connection.query(query, [departmentName], (err,result) =>{
            if (err) {
                console.log('Error Adding to db ', err);
                reject(err);
            } else {
                console.log('Perfect! More Departments..')
                resolve(result);
            }
        });
    });
}

// add Role




























module.exports = { viewDepartments, viewRoles, viewAllEmployees , addDepartment };