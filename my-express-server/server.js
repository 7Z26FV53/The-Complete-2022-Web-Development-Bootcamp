const express = require('express');
const app = express();

/* visit by typing "localhost:3000/" */
app.get("/", function(req, res) {
    // console.log(req);
    res.send("<h1>hello</h1>");
});

/* http://localhost:3000/contact */
app.get("/contact", function(req, res) {
    res.send("19890604");
});

app.get("/about", function(req, res) {
    res.send("hi, im rein");
});

app.listen(3000, function() { // 3000 is the port of home route
    console.log("im on port 3000");
});