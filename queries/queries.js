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
                console.log('Perfect! More Departments..Department added: ' + departmentName);
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
 
//                          FETCH FUNCTIONS 

function getEmployees() {
    const query = 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee';

    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching employees: ' + err);
                reject(err);
            } else {
                const employeeChoices = results.map(emp => ({
                    name: `${emp.name} - ID: ${emp.id}`,
                    value: emp.id
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


// Fetch Managers 

// SQL Query Debreif // 

// In this function SELECT DISTINCT query will be used 
// INNER JOIN will allow us to join two rows from multiple tables 

function getManagers() {
    const query = `
    SELECT DISTINCT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name 
    FROM employee e
    INNER JOIN employee m ON e.id = m.manager_id;
`;

    return new Promise ((resolve, reject ) => {
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching managers:' + err); 
                reject(err);

            } else { 
                const managerChoices = results.map(manager => ({
                    name: manager.name,
                    value: manager.id
                }));
                resolve(managerChoices);
            }
        });
    });
}

// Fetch Departments 

function getDepartments() {
    const query = 'SELECT id, name FROM department';

    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching departments: ' + err);
                reject(err);
            } else {
                const departmentChoices = results.map(dept => ({
                    name: dept.name,
                    value: dept.id
                }));
                resolve(departmentChoices);
            }
        });
    });
}


 // fetch employees by department 

 function getEmployeesByDepartment(departmentId) {
    const query = `
        SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS employee_name, r.title AS role_title
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        WHERE d.id = ?;
    `;

    return new Promise((resolve, reject) => {
        connection.query(query, [departmentId], (err, results) => {
            if (err) {
                console.error('Error fetching employees by department: ' + err);
                reject(err);
            } else {
                resolve(results);
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

// Get employee by manager 

// the const query is much different then the rest so i will break it down here 
// usine e.id will select the coloumn id from the employee table 
// CONCAT has been used here before but this just allows to concatenate the first and last name colunms for each employee 
// The rest of the query is the same. 



function getSupervisor(managerId) {
    const query = "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS name FROM employee e WHERE e.manager_id = ?";


    return new Promise ((resolve, reject) => {
       // console.log(query); // Added for debugging 
        connection.query(query, [managerId], (err , results) => {
            if (err) {
                console.error('Eror fetching employee by manager');
                reject(err);
            } else {
                console.log('Fetched Employee by manager');
                resolve(results);
            }
        });
    });
};

//                  DELETE from db 

// Delete Department 

function deleteDepartments(departmentId) {
    const query = 'DELETE FROM department WHERE id = ?';

    return new Promise((resolve , reject) => {
        connection.query(query, [departmentId], (err,result) => {
            if (err) {
                console.log('Error Deleting department: ' + err);
            } else {
                console.log ('Department deleted from db' );
                resolve(result)
            }
        })
    })
}

// Delete Role 

function deleteRole(roleId) {
    const query = 'DELETE FROM role WHERE id = ?';

    return new Promise((resolve, reject) => {
        connection.query(query, [roleId], (err, result) => {
            if (err) {
                console.error('Error deleting role: ' + err);
                reject(err);
            } else {
                console.log('Role deleted successfully.');
                resolve(result);
            }
        });
    });
}

// Delete Employee 

function deleteEmployee() {
    const query =  "DELETE FROM employee WHERE id = ?";

    return new Promise ((resolve, reject ) => {
        connection.query(query, [employeeId], (err, result) => {
            if (err) {
                console.error('Error deleting employee', + err)
                reject(err);
            } else {
                console.log('Employee deleted'); 
                resolve(result);
            }
        });
    });
}


module.exports = { viewDepartments, viewRoles, viewAllEmployees , addDepartment, addRole , addEmployee , getEmployees, getRoles , getManagers , getDepartments , getEmployeesByDepartment , updateEmployeeRole , updateEmployeeMan, getSupervisor, deleteDepartments , deleteRole , deleteEmployee};