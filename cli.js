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
  //            Department Prompt 

  {
    type: 'input', 
    name: 'departmentName', 
    message: 'Enter the name of the new Department:',
    when: (answers) => answers.menuChoice === 'Add Deprartment',
    validate: (input) => {
      if (input.trim() === '') {
        return 'Department name cannot be empty.';
      }
      return true;
    },
  },

  //              New Role Prompt 
  {
    type: 'input',
    name: 'roleTitle',
    message: 'Enter the title of the new role:',
    when: (answers) => answers.menuChoice === 'Add Role',
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
    when: (answers) => answers.menuChoice === 'Add Role', 
    validate: input => {
      if (!input.match(/^\d+$/)) {
        return 'Please enter a valid salary. Please use numbers only';
      }
      return true;
    }
  },
 {
  type: 'input',
  name:'departmentId',
  message: 'Enter the department ID for the new role:',
  when: (answers) => answers.menuChoice === 'Add Role',
  validate: input => {
    if (!input.match(/^\d+$/)) {
      return 'Please enter a valid Department ID, Please use numbers only';
    }
    return true; 
  }
 },
  
 //                Add Employee Prompt
  {
    type: 'input',
    name: 'firstName',
    message: 'Enter the first name of the new employee:',
    when: (answers) => answers.menuChoice === 'Add Employee',
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

      case 'Add Department':
          //Prompt from the departmentName 
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
        const roleAnswers = await inquirer.prompt([
          {
            type: 'input',
            name: 'roleTitle',
            message: 'Enter the title of the new role:',
            when: (answers) => answers.menuChoice === 'Add Role',

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
            when: (answers) => answers.menuChoice === 'Add Role',
            validate: input => {
              if (!input.match(/^\d+$/)) {
                return 'Please enter a valid salary. Please use numbers only';
              }
              return true;
            }
          },
         {
          type: 'input',
          name:'departmentId',
          message: 'Enter the department ID for the new role:',
          when: (answers) => answers.menuChoice === 'Add Role',
          validate: input => {
            if (!input.match(/^\d+$/)) {
              return 'Please enter a valid Department ID, Please use numbers only';
            }
            return true; 
          }
        }
        ]);
        
        console.log(roleAnswers);
        
        
        //await addRole(roleAnswers.roleTitle, roleAnswers.roleSalary, roleAnswers.departmentId);
        break;
        case 'Add Employee':
      
        // Logic for adding Employee 
      
        await addEmployee();
          break;
       case 'Update Employee Role':
        
      

        // Logic for updating Employee 
        
        
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
