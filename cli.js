const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./queries/queries.js');

//           INQUIRER PROMPTS 


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
  },
  // Department Prompt 

  {
    type: 'input', 
    name: 'departmentName', 
    message: 'Enter the name of the new Department:',
    when: (answers) => answers.menuChoice === 'Add a Deprartment',
    validate: (input) => {
      if (input.trim() === '') {
        return 'Department name cannot be empty.';
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'title',
    message: 'Enter the title of the new role:',
    when: (answers) => answers.menuChoice === 'Add a Role',
    // Other role prompts
  },
  // Add Employee Prompt
  {
    type: 'input',
    name: 'firstName',
    message: 'Enter the first name of the new employee:',
    when: (answers) => answers.menuChoice === 'Add an Employee',
    // Other employee prompts
  },

  
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
