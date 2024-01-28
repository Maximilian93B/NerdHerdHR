
//           INQUIRER PROMPTS 
const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } = require('./queries/queries.js');


//                MAIN MENU Stucture
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
  
  //              NEW DEPARTMENT 
  
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
 
];
//            START NERDHERD
async function start() {
  try {
    // Display the main menu and capture users choice 
    const { menuChoice } = await inquirer.prompt(mainMenu);

    // Switch statements to handle the users chioces 
    // Each Case will allow the user to view Tables from SQL database via await function like await "viewFunction()""
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
          //Prompt to add a new Department 
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
          // Prompt for a new role 
        const roleAnswers = await promptAddRole();
        await addRole(roleAnswers.roleTitle, roleAnswers.roleSalary, roleAnswers.departmentId);
        break;
      
        case 'Add Employee':
        // Logic for adding Employee...
        const employeeData = await addEmployeeAnswers();
        await addEmployee(employeeData.firstName, employeeData.lastName, employeeData.roleId, employeeData.managerId, employeeData.salary); 
        break;
     
        case 'Update Employee Role':
        // Logic for updating Employee Role...
        await updateEmployeeRole();
        break;
     
        case 'Exit':
          // Exit the promgram 
        console.log('Till Next Time Mr. Jones');
        process.exit(0);
    }
  } catch (error) {
    console.log('Woah, Something is wrong here ' + error);
  }
}


// Start NerdHerdHR
start();



//            ADD ROLE
// this function will prompt the user to enter the details needed to INSERT a new role  
async function promptAddRole() {
  console.log('Before role prompts');
  // Prompt for role details 
  const roleAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'Enter the title of the new role:',
      validate: input => {
        // validate cannot be empty string 
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
        // validate cannot be VARCHAR needs to be INT 
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
        // same same as above 
        if (!input.match(/^\d+$/)) {
          return 'Please enter a valid Department ID, Please use numbers only';
        }
        return true;
      }
    }
  ]);
  // log answers to display input  
  console.log('Role Answers:', roleAnswers);
  return roleAnswers;
}


//           Add Employee 
// Thhis function prompts the user to enter valid information to add Employee to the db
// Using same return logic as the others

 async function addEmployeeAnswers() {
  console.log('Adding a new Employee');

  const employeeData = await inquirer.prompt([
  
    {
      type: 'input',
      name: 'firstName',
      message: 'Please enter the employee\'s first name:',
      validate: input => {
          if (input.trim() === '') {
              return 'First name cannot be empty.';
          }
          return true;
      }
  },
  
  {
    type: 'input',
    name: 'lastName',
    message: 'Please enter the employee\'s last name:',
    validate: input => {
        if (input.trim() === '') {
            return 'Last name cannot be empty.';
        }
        return true;
    }
  },  
  
  {
    type: 'input',
    name: 'roleId',
    message: 'Please enter the Employees Role ID',
    validate: input => {
      if (input.trim() === '') {
          return 'First name cannot be empty.';
      }
      return true;
  }
  },
  
  {
    type: 'input',
    name: 'managerId',
    message: ' Enter the manager ID for the employee:  ', 
    validate: input => {
      if (input.trim() === '') {
          return 'Last name cannot be empty.';
      }
      return true;
  }
  },
  
  {
    type: 'input',
    name: 'salary',
    message: ' Enter the salary for the Employee ', 
    validate: input => {
      if (!input.match(/^\d+(\.\d{1,2})?$/)) {
          return 'Please enter a valid salary. Use numbers only, up to 2 decimal places.';
      }
      return true;
    }
  }
])
  console.log( 'Employee Data', employeeData)
  return employeeData;
}