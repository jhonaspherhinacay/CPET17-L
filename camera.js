// Import Express, MySQL BodyParser and Port and table name
const express = require("express");
const mysql = require("mysql2");
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test", //change this into custom database name
});

// call database table
const db_table = 'detect_time';

app.listen(port, () => {
    console.log(`Server is running on port http://127.0.0.1:${port}`);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// insert time when motion is detected using opencv
app.post("/addtime", (req, res) => {
    var var_time = req.body.var_time;
    connection.query(
        `INSERT INTO ${db_table} (time) VALUES (?);`, [var_time, ],
        function() {
            try {
                res.json({ data: [var_time] });
            } catch (err) {
                res.send(Error, '${ err }');
            }
        }
    );
});