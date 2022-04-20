// installed: express js, body-parser
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true})); // .urlencoded parse the html file

// https://www.w3schools.com/tags/ref_httpmethods.asp
// http methods get vs post

app.get("/", function(req, res) {
    //__dirname is the current file path(no matter where u r)
    res.sendFile(__dirname + "/index.html"); // send index.html to the usr
});

// proces post requests
app.post("/", function(req, res) {
    // console.log(req.body); // e.g. { num1: '1', num2: '1', submit: '' }
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;
    res.send("result: " + result);
});

app.get("/bmicalculator", function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res) {
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    var result = weight / (height*height);
    res.send("your BMI is " + result + ".");
});

app.listen(3000, function() { // 3000 is the port of home route
    console.log("im on port 3000");
});
