const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./queries/queries.js');

const mainMenu = [
  {
    type: 'list',
    name: 'menuChoice',
    message: 'Main Menu - Choose an option:',
    choices: [
      'View All Departments',
      'View All Roles',
      'View All Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Exit'
    ]
  }
];

// Function Calls for inquirer prompts on selection for the users

async function start() {
  try {
    const { menuChoice } = await inquirer.prompt(mainMenu);

    switch (menuChoice) {
      case 'View All Departments':
        await viewDepartments();
        break;
      case 'View All Roles':
        await viewRoles();
        break;
        case 'View All Employees':
          await viewAllEmployees();
          break;
      case 'Add a Department':
        await addDepartment();
        break;
      case 'Add a Role':
        await addRole();
        break;
      case 'Add an Employee':
        await addEmployee();
        break;
      case 'Update an Employee Role':
        await updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Till Next Time Mr. Jones');
        process.exit(0);
    }
  } catch (error) {
    console.log('Woah, Something is wrong here ' + error);
  }
}

start();
