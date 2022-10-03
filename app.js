// Import Express, MySQL BodyParser and Port and table name
const express = require("express");
const mysql = require("mysql2");
var bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db_table = 'reg';

// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test", //change this into custom database name
});

// throw error if connection failed
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to Database!");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// create
app.post('/create', (req, res) => {
    var fn = req.body.fn;
    var ln = req.body.ln;

    connection.query(
        `INSERT INTO ${db_table} (fn, ln) VALUES (?, ?);`, [
            fn,
            ln,
        ],
        function() {
            try {
                app.get('/show', (req, res) => {
                    res.send("${fn} ${ln}");
                })
            } catch (err) {
                res.send(Error, "${err}");
            }
        }
    );
})


// delete
app.post('/delete', (req, res) => {
    var id = req.body.id;
    connection.query(
        `DELETE FROM ${db_table} WHERE id = ?;`, [
            id,
        ],
        function() {
            try {
                app.get('/show', (req, res) => {
                    res.send("DELETED");
                })
            } catch (err) {
                res.send(Error, "${err}");
            }
        }
    );
})


// listen to port

app.listen(port, () => {
    console.log(`console.log(Server is running on port ${port}`);
});