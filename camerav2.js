// Import Express, MySQL BodyParser and Port and table name
const express = require("express");
const mysql = require("mysql2");
var bodyParser = require('body-parser');
const app = express();
const port = 3000;
var fileUpload = require('express-fileupload');

app.use(fileUpload());

// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test", //change this into custom database name
});

app.listen(port, () => {
    console.log(`Server is running on port http://127.0.0.1:${port}`);
});

// Connection Handling Error
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// call database table
const db_table = 'camerav2';


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// insert time when motion is detected using opencv
app.post("/upload", (req, res) => {
    var filename = req.files.filename;
    connection.query(
        `INSERT INTO ${db_table} (filename) VALUES (?);`, [filename, ],
        function() {
            try {
                res.json({ data: [filename] });
            } catch (err) {
                res.send(Error, '${ err }');
            }
        }
    );
});