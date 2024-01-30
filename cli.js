//Dev Notes 


// Import chalk and figlet 
const chalk = require('chalk');
const figlet = require('figlet');


//           Import inquirer and all querie functions from 'queries.js'
const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewAllEmployees, addDepartment, addRole, addEmployee, getRoles,  getEmployees ,  getManagers ,  getDepartments , getEmployeesByDepartment , updateEmployeeRole , updateEmployeeMan , getSupervisor , deleteDepartments , deleteEmployee , deleteRole , departmentSum } = require('./queries/queries.js');


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
      'Update Employee Manager',
      'Search Employees by Manager',
      'Search by Department',
      'Delete Department',
      'Delete Role',
      'Delete Employee',
      'Department Salary Totals',
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
  console.clear();

  console.clear();
  // Display figlet header 
  console.log(
    chalk.green(figlet.textSync(' Nerd Herd HR ', { horizontalLayout: 'full' })));

    //Welcome message 
    // Using Figlet and Chalk to add some flair to NerhHerd
    console.log(chalk.red(' \n Welcome to NerdHerd HR Management System!'));
    console.log (chalk.red('\n This application helps you manage HR tasks such as viewing and updating employee details, departments, and roles.'));

    console.log('\n');

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
            message: chalk.red('Enter the name of the new Department:'),
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
        await promptUpdateEmployeeRole();
        break;

        case 'Update Employee Manager':
        await promptUpdateEmployeeMan();
        break;
        
        case 'Search Employees by Manager':
          await promptGetSupervisor();
          break;

          case'Search by Department':
            await promptGetDepartments();
            break;

            case 'Delete Department':
            await promptDeleteDepartment();
            break;

            case 'Delete Role':
              await promptDeleteRole();
              break;

              case 'Delete Employee':
                await promptDeleteEmployee();
                break;

                case 'Department Salary Totals':
                  await promptDepartmentSum()
                  break;

        case 'Exit':
          // Exit the promgram 
        console.log(chalk.green('Ill keep the Nerds in check till you get back!'));
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


//           ADD EMPLOYEE 
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

// UPDATE EMPLOYEE ROLE 

// the getEmployees() and getRoles() can be found in queries.js 

  async function promptUpdateEmployeeRole() {
    console.log('Updating an Employee/s Role');

    // Get lists of employees and roles 
    const employees = await  getEmployees();
    console.log(employees); // Debugging line
    const roles = await getRoles(); 

    try {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee whose role you want to update:',
          choices: employees // Array of {name , value }
        },
        {
          type: 'list',
          name: 'roleId',
          message: 'Select the new role for the employee:',
          choices: roles // Same as employees 
        }, 
      ]);

    console.log('Employee Update', answers); // Corrected to log 'answers'
    await updateEmployeeRole(answers.employeeId, answers.roleId);
    } catch (error) {
      console.error('An error occurred:', error);
  }
};


// Update Employee manager_id 

async function promptUpdateEmployeeMan() {
    // Get list of employees for prompt 
    const employees = await getEmployees();

    const answers = await inquirer.prompt([
      {
        type: 'list', 
        name: 'employeeId',
        message: 'Select employee whose manager you would like to change',
        choices: employees
      },
      {
        type: 'list',
        name: 'newManagerId',
        message: 'Selecet the new manager for the employee ',
        choices: employees
      },
    ]);

      await updateEmployeeMan(answers.employeeId, answers.newManagerId);
      console.log ('updated manager successfully'); 

  }

// Search Employees by Manager 

async function promptGetSupervisor() {

  // use getManagers() to fetch managers  
  const managers = await getManagers();

  const { managerId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'managerId',
      message: ' Select a manager and view their employee/s',
      choices: managers
    }
  ]);
  
  // wait for getSupervisor() to fetch selected manager from db 
  const employees = await getSupervisor(managerId);
  // if the returned object has data, print the data to a table 
  if(employees.length > 0) {
    console.table(employees);
  } else {
    // If no manager, log no employee found under this manager
    console.log('No employee/s found for this manager.');
  }
}


// Get employees by Departments


async function promptGetDepartments() {
  const departments = await getDepartments();

  const { departmentId } = await inquirer.prompt([
      {
          type: 'list',
          name: 'departmentId',
          message: 'Select a department to view its employees:',
          choices: departments
      }
  ]);

  // Corrected to call getEmployeesByDepartment
  const employees = await getEmployeesByDepartment(departmentId);
  if (employees.length > 0) {
      console.table(employees);
  } else {
      console.log('No employees found in this department.');
  }
}

async function promptDeleteDepartment() {
  const departments = await getDepartments();

  const { departmentId } = await inquirer.prompt([
    {
      type:'list',
      name: 'departmentId', 
      choices: departments 
    }
  ]);

  await deleteDepartments(departmentId);
  console.log('Department has benn deleted')
}


// Delete Role 

async function promptDeleteRole() {
  const roles = await getRoles(); 

  const { roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'Please select a role you would like to delete',
      choices: roles
    }
  ]);

    await deleteRole(roleId);
    console.log('Role has been deleted');
}


 // Delete Employee 

 async function promptDeleteEmployee() {
  const employees = await getEmployees();

  const { employeeId } = await inquirer.prompt([
    {
      type:'list',
      name: 'employeeId',
      message: ' Please select the employee you would like to delete',
      choices: employees
    }
  ]);
    
    await deleteEmployee(employeeId);
    console.log('Employee has been deleted.'); 
 }

 // Department Sum 

 async function promptDepartmentSum() {
  const departments = await getDepartments();

  const { departmentId } = await inquirer.prompt([
      {
          type: 'list',
          name: 'departmentId',
          message: 'Select a department to view its total salary budget:',
          choices: departments
      }
  ]);

  const totalBudget = await departmentSum(departmentId);
  console.log(`Total Salary Budget for Department: $${totalBudget}`);
}
