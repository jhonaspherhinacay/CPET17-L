// console.log("Hello World!");
var bodyParser = require('body-parser');
const express = require("express");
const app = express();
const port = 3000;


app.listen(port, () => {
    console.log(`console.log(Server is running on port ${port}`);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post("/read", (req, res) => {
    var df = req.body.df;
    res.send(df);
});