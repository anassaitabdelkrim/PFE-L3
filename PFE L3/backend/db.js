const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ChambreReservation"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Mysql database connection established successfully");
});

module.exports = con;