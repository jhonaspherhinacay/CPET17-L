// console.log("Hello World!");

const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

// create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/", (req, res) => {
    res.send("Hello 4B!");
});

app.get("/users", (req, res) => {
    console.log(req.query);
    // connect to database
    // query list all users
    // with placeholder
    connection.query(
        "SELECT * FROM `test` WHERE id = ?", [req.query.id],
        function(err, results) {
            console.log(results);
            // first check if there are results
            try {
                res.send(`Hi ${results[0].name}!`);
            } catch (err) {
                res.send(`Error: ${err}!`);
            }

        }
    );
    // if(results) -> response all users
    // if(!results) -> response error message
});

app.get("/allusers", (req, res) => {
    console.log(req.query);

    connection.query(
        "SELECT * FROM `test` ",
        function(err, tables) {
            console.log(tables);
            // first check if there are results
            try {
                for (let i = 0; i < tables.length; i++) {
                    var name = `${tables[i].id} + ${tables[i].name} \n `
                    res.write(name);
                }
                res.end();

            } catch (err) {
                res.send(`Error: ${err}!`);
            }

        }
    );

});

connection.query("SELECT * FROM `test` ", function(err, tables) {
    console.log(tables);
});

app.listen(port, () => {
    console.log(`console.log(Server is running on port ${port}`);
});