const express = require("express");
const app = express();
const port = 3000;

const mysql = require('mysql');

const config = mysql.createConnection({
    host: "db",
    user: "root",
    password: "root",
    database: "nodedb",
    port: 3306,
});

const connection = mysql.createConnection(config)

connection.connect((error) => {
    if(error) {
        console.error('Error connecting: ' + error.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});


const createTable = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;
connection.query(createTable);

const sql = `INSERT INTO people(name) VALUES ("Lael")`;
connection.query(sql);
connection.end();


app.get("/", (req, res) => {
    res.send("<h1>Full Cycle</h1>");
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
})

