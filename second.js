// console.log("Hello World!");

// Import Express, MySQL and Port
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


// know if database is connected
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//Instructions in introduction
app.get("/", (req, res) => {
    res.send("Type http://localhost:3000/add?fn={fn}&ln={ln}&pn={pn}&a1={a1}&a2={a2}&e={e} if Add, Type localhost:3000/del?id={id} to DELETE, Type http://localhost:3000/update?fn={fn}&ln={ln}&pn={pn}&a1={a1}&a2={a2}&e={e}&id={id} if UPDATE");
});

//display tablo in terminal or console
connection.query("SELECT * FROM `registration` ", function(err, tables) {
    console.log(tables);
});

//display server running of ports in terminal or console
app.listen(port, () => {
    console.log(`console.log(Server is running on port ${port}`);
});

// Insert of data in our database
// chrome web input - http://localhost:3000/add?fn={fn}&ln={ln}&pn={pn}&a1={a1}&a2={a2}&e={e}
app.get("/add", (req, res) => {
    connection.query(
        "INSERT INTO registration (fn, ln, pn, a1, a2, e) VALUES (?, ?, ?, ?, ?, ?);", [
            req.query.fn,
            req.query.ln,
            req.query.pn,
            req.query.a1,
            req.query.a2,
            req.query.e,
        ],
        function() {
            try {
                console.log(req.query);
                res.send("Registered");
            } catch (err) {
                res.send(Error, `${err}`);
            }
        }
    );
});


//Insert of data in our database
// chrome web input - http://localhost:3000/del?id={id}
app.get("/del", (req, res) => {
    connection.query(
        "DELETE FROM registration where id=?;", [req.query.id],
        function() {
            try {
                res.send("Unregistered");
            } catch (err) {
                res.send(Error, `${err}`);
            }
        }
    );
});


app.get("/update", (req, res) => {
    connection.query(
        "UPDATE registration SET fn = ?, ln = ?, pn = ?, a1 = ?, a2 = ?, e = ? WHERE id = ?;", [
            req.query.fn,
            req.query.ln,
            req.query.pn,
            req.query.a1,
            req.query.a2,
            req.query.e,
            req.query.id,
        ],
        function() {
            try {
                console.log(req.query);
                res.send("Updated");
            } catch (err) {
                res.send(Error, `${err}`);
            }
        }
    );
});


// Diplay all users
app.get("/allusers", (req, res) => {
    console.log(req.query);
    connection.query(
        "SELECT * FROM registration ",
        function(err, tables) {
            console.log(tables);
            // first check if there are results
            try {
                for (let i = 0; i < tables.length; i++) {
                    var name = `${tables[i].id}  ${tables[i].fn}  ${tables[i].ln}  ${tables[i].pn}  ${tables[i].a1}  ${tables[i].a2}  ${tables[i].e} \n `
                    res.write(name);
                }
                res.end();

            } catch (err) {
                res.send(`Error: ${err}!`);
            }

        }
    );

});