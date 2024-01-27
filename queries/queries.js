// This file containts all queries made to the db. 
// It is broken down into View, Add , Update , 
// The workflow will take you this way



//                      VIEW FUNCTIONS 

const connection = require('../db/connection.js');

// View Departments 

function viewDepartments() {
    const query = 'SELECT * FROM department';

    connection.query(query, (err, results) => {
        if (err) {
            console.log ('What a minute.. We can select from departments;' + err);
            return;
        }
        
        console.log('\nDepartments:\n');
        console.table(results);
    
    
    
    })
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
    return new Promise ((resolve, reject) => {
        connection.query(query, [departmentName], (err,result) =>{
            if (err) {
                console.log('Error Adding to db ', err);
                reject(err);
            } else {
                console.log('Perfect! More Departments..Department added:',$({departmentName}));
                resolve(result);
            }
        });
    });
}

// add Role

//INSERT INTO role (title, salary, department_id) VALUES ('Software Engineer', 70000, 1);

function addRole(title, salary, departmentId) {
    console.log('Adding role:', title, salary, departmentId); // Debugging line

    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';

    connection.query(query, [title, salary, departmentId], (err, result) => {
        if (err) {
            console.error('Error adding role to the database: ' + err);
            // handle error
        } else {
            console.log(`Role added: ${title}`);
            // handle success
        }
    });
}


























module.exports = { viewDepartments, viewRoles, viewAllEmployees , addDepartment, addRole };