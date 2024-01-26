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

function promptAddEmployee() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: "Enter the employee's first name:",
            validate: input => input.trim() !== '' 
        },
        {
            type: 'input',
            name:'last_name',
            message: "Enter the employee's last name:",
            validate: input => input.trm() !== ''
        },
        {
            type: 'input',
            name: 'role_id',
            message: "Enter the employee's role ID:",
            validate: input => !isNaN(input) && input.trim() !== ''
        },
        {
            type: 'input',
            name: 'manager_id',
            message: "Enter the employee's manager ID (optional):",
            validate: input => input.trim() === '' || (!isNaN(input) && input.trim() !== '')
        },
        
        //
    ]);
}

module.exports = { mainMenu }; 



