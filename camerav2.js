// Import Express, MySQL BodyParser and Port and table name
const express = require("express");
const mysql = require("mysql2");
var bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const port = 3000;


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


app.post('/upload', (req, res) => {
    var var_time = req.body.var_time;
    var file_path = req.body.file_path;

    // read file from the path from the json
    var image = fs.readFileSync(file_path);
    console.log(image);

    // save datetime, imgfile, into the db
    connection.query(`INSERT INTO ${db_table} (datetime, filename) VALUES (?, ?);`, [var_time, image],
        (err, result) => {
            try {
                if (result.affectedRows > 0) {
                    res.json({ data: "Success" });
                } else {
                    res.json({ message: "Something went wrong." });
                }
            } catch {
                res.json({ message: err });
            }
        })
})


app.get("/display", (req, res) => {
    console.log(req.query);

    connection.query(
        "SELECT * FROM `camerav2` ",
        function(err, tables) {
            console.log(tables);
            // first check if there are results
            try {
                for (let i = 0; i < tables.length; i++) {
                    var name = `${tables[i].id} + ${tables[i].datetime} + ${tables[i].filename.toString("base64")} \n `
                    res.write(name);
                }
                res.end();

            } catch (err) {
                res.send(`Error: ${err}!`);
            }

        }
    );

});