// Import Inquirer 
const inquirer = require('inquirer');

// Main menu 

function mainMenu() {
    return inquirer.prompt([
        // used inquirer prompts to prompt user for actoions 'chooices' 
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all Employees', 'Add Employee', 'Update Employee' , 'View All Departments']

        },
    ]);
}


module.exports = { mainMenu }; 


