// This js file is used to tie all main components together
// will use functions from inquirer to display menu 
// will use inquirer to call functions from queries.js

const { mainMenu } = require('./inquirerPrompts');
const queries = require('./queries/queries');
const connection = require('./db/connection');


async function init() {
    try {
        const { action } = await mainMenu();
        console.log('User selected:', action);

        if (action === 'View All Employees') {
            // Your logic to handle this action
            const query = "SELECT * FROM employee";
            return new Promise((resolve, reject) =>
        {
            connection.query(query, (err,results) =>{
                if (err) reject(err);
                resolve(results);
            });
        });
        }
        // ... other actions ...
    } catch (err) {
        console.error('Error:', err);
    }
}

init();



