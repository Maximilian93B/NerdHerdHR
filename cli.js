
//           INQUIRER PROMPTS 
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
  },
  {
    type: 'input', 
    name: 'departmentName', 
    message: 'Enter the name of the new Department:',
    when: (answers) => answers.menuChoice === 'Add Department',
    validate: (input) => {
      if (input.trim() === '') {
        return 'Department name cannot be empty.';
      }
      return true;
    },
  },
  // Other prompts (if any)...
];

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
      case 'Add Department':
        const {departmentName} = await inquirer.prompt([
          {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the new Department:',
            validate: input => {
              if (input.trim() === '') {
                return 'Department name cannot be empty.';
              }
              return true;
            }
          }
        ]);
        await addDepartment(departmentName);
        break;
      case 'Add Role':
        const roleAnswers = await promptAddRole();
        await addRole(roleAnswers.roleTitle, roleAnswers.roleSalary, roleAnswers.departmentId);
        break;
      case 'Add Employee':
        // Logic for adding Employee...
        await addEmployee();
        break;
      case 'Update Employee Role':
        // Logic for updating Employee Role...
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

async function promptAddRole() {
  console.log('Before role prompts');
  const roleAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'Enter the title of the new role:',
      validate: input => {
        if (input.trim() === '') {
          return 'Role title cannot be empty';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: 'Enter the salary for the new role:',
      validate: input => {
        if (!input.match(/^\d+$/)) {
          return 'Please enter a valid salary. Please use numbers only';
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter the department ID for the new role:',
      validate: input => {
        if (!input.match(/^\d+$/)) {
          return 'Please enter a valid Department ID, Please use numbers only';
        }
        return true;
      }
    }
  ]);
  
  console.log("Role Answers:", roleAnswers);
  return roleAnswers;
}
