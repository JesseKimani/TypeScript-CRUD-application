// const mysql = require('mysql');
import mysql from 'mysql';
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vehicles',
    port: 3306,
});


connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }

});


export default connection;
