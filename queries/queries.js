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
      // Display results as a table
      console.table(results);
  
      //  NEED TO ADD --> Return to the main menu or othe feautures 
      
    });
  }


// View all Employees 

function viewAllEmployees() {
    // SQL query to SELECT employee table 
    const query = 'SELECT * FROM employee';

    connection.query(query, (err, results) => {
        if (err) {
            console.log ('These Employees are lackin, Cannot retireive employee data: ' + err); 
            return;
        }
        console.log('\nEmployees\n');
        // Display Employee table
        console.table(results);  
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

function addRole(title, salary, departmentId) {
    console.log('Adding role:', title, salary, departmentId); // Debugging -_- 
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.query(query, [title, salary, departmentId], (err, result) => {
                if (err) {
                console.error('Error adding role to the database: ' + err);
                reject(err); // Reject the promise and we are sad :(
                } else {
                console.log(`Role added: ${title}`);
                resolve(result); // Resolve the promise and away we go !! 
            }
        });
    });
}

// Add an Employee to the database
function addEmployee(firstName, lastName, roleId, managerId, salary) {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id, salary) VALUES (?, ?, ?, ?, ?)';

    return new Promise((resolve, reject) => {
        connection.query(query, [firstName, lastName, roleId, managerId || null, salary], (err, result) => {
            if (err) {
                console.error('Error adding employee to the database: ' + err);
                reject(err);
            } else {
                console.log(`Employee added: ${firstName} ${lastName}`);
                resolve(result);
            }
        });
    });
}

// Update Employee Role 

// Fetch employee data from db first 

    function getEmployees() {
        const query = 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee';
    
        return new Promise((resolve, reject) => {
            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error fetching employees: ' + err);
                    reject(err);
                } else {
                    // Map the results to the  format for Inquirer
                    const employeeChoices = results.map(employee => ({
                        name: employee.name,
                        value: employee.id
                    }));
                    resolve(employeeChoices);
            }
        });
    });
}




// Fetch Role data from db 

function getRoles() {
    const query = 'SELECT id, title FROM role';

    return new Promise ((resolve , reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                console.log(' Error Fetching roles' + err);
                reject(err);
            } else { 
                const roleChoices = results.map(role => ({
                    name: role.title,
                    value: role.id
                }));
                resolve(roleChoices);
            }
        });
    });
}


// UPDATE employee role 

function updateEmployeeRole(employeeId, newRoleId) {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';

    return new Promise((resolve, reject) => {
        connection.query(query, [newRoleId, employeeId], (err, result) => {
            if (err) {
                console.error('Error updating employee\'s role: ' + err);
                reject(err);
            } else {
                console.log('Employee\'s role updated successfully.');
                resolve(result);
            }
        });
    });
}

//                      BONUS FEAUTRES 


// update employee Managers 

function updateEmployeeMan(employeeId, newManagerId) {
    const query = 'UPDATE employee SET manager_id = ? WHERE id = ?';

    return new Promise((resolve, reject) => {
        connection.query(query, [newManagerId, employeeId], (err, result) => {
            if (err) {
                console.error('Error updating employee\'s manager: ' + err);
                reject(err);
            } else {
                console.log('Employee\'s manager updated successfully.');
                resolve(result);
            }
        });
    });
}




module.exports = { viewDepartments, viewRoles, viewAllEmployees , addDepartment, addRole , addEmployee , getEmployees, getRoles , updateEmployeeRole , updateEmployeeMan };