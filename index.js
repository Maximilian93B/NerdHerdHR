// This js file is used to tie all main components together
// will use functions from inquirer to display menu 
// will use inquirer to call functions from queries.js

const { mainMenu } = require('./inquirerPrompts');
const queries = require('./queries/queries');

async function init() {
    try {
        const { action } = await mainMenu();
        console.log('User selected:', action);

        if (action === 'View All Employees') {
            console.log('Fetching all employees...');
            try {
                const employees = await queries.getAllEmployees();
                console.table(employees);
            } catch (queryError) {
                console.error('Error fetching employees:', queryError);
            }
        }
        // ... other actions ...
    } catch (err) {
        console.error('Error:', err);
    }
}

init();


