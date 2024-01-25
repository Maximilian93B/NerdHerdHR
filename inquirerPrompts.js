// Import Inquirer 
const inquirer = require('inquirer');

// Main menu 

function mainMenu() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all Employees', 'Add Employee', 'Update Employee' , 'View All Departments']

        },
    ]);
}


module.exports = { mainMenu }; 


