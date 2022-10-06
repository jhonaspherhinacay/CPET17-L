// Import Express, MySQL BodyParser and Port and table name
const express = require("express");
// const mysql = require("mysql2");
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

// // create the connection to database
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "test", //change this into custom database name
// });

// // call database table
// const db_table = 'reg';

app.listen(port, () => {
    console.log(`Server is running on port http://127.0.0.1:${port}`);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.send("Hello 4B!");
    console.log("Hello 4B!");
});

app.get("/read", (req, res) => {
    console.log("Hello!");
    var df = req.body.df;
    res.send(df);
    console.log(df);

});