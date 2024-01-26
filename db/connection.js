const mysql2 = require('mysql2');

// Connection to mySQL database 

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password:'adminroot',
    database: 'nerdherd_db'
});


connection.connect((err)=>{
    if (err) {
        console.log('/n Wait..Something is wrong, I cant get it' + err.stack);
        return;
    }
    console.log(' Hey! We are in! Connected to nerdherd_db as User ' + connection.threadID)
});

module.exports = connection; 
