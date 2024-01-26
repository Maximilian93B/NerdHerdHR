const inquirer = require('inquirer');
const { viewDepartments, viewRoles, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./queries/queries.js');


const mainMenu = [
    {
      type: 'list',
      name: 'menuChoice',
      message: 'Main Menu - Choose an option:',
      choices: [
        'View All Departments',
        'View All Roles',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
      ]
    }
  ];
  
  // Function Calls for inquirer prompts on selection for the users 

  async function start() {
    try {
        const { menuChoice } = await inquirer.createPromptModule(mainMenu);

        switch (menuChoice) {
            case 'View All Departments':
                await viewDepartments();
                break;
            case "View All Roles": 
                await viewRoles();
                break;
            case 'Add a department':
                await addDepartment();
                break;
            case 'Add a role': 
                await addRole();
                break;
            case 'Add Employee':
                await addEmployee();
                break;
            case 'Exit':
                console.log ('Till Next Time Mr.Jones')
                process.exit(0)            
        }
    } catch (error) {
        console.log ('Woah, Something is wrong here ' + error);
    }
  }


  start();