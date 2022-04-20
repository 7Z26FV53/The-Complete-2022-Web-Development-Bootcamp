const express = require('express');
const https = require("https");
const bp = require("body-parser");
const app = express();

app.use(bp.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

    // cant include more than one res.send() in one app.get()/app.post()
    // res.send(":D");
});

app.post("/", function(req, res) {

    // must include the prefix "https://"
    const query = req.body.cityName;
    const apiKey = "35579582f70f981c2e9da5fcf576fca5";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    
    // the approach to parse json
    https.get(url, function(response) {
        // console.log(response.statusCode);
        response.on("data", function(data) {
            const wData = JSON.parse(data);
            // console.log(wData);
            // const obj = {
            //     name:"rein",
            //     age:21
            // }
            // console.log(JSON.stringify(obj));
            const temp = wData.main.temp;
            console.log(temp);
            const desc = wData.weather[0].description;
            const icon = wData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>Temperature in " + query + ": " + temp + " degrees celsius</h1>");
            res.write("<p>Current weather: " + desc + ".<\p>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        });
    });
});

app.listen(3000, function() {
    console.log("im at port 3000 !");
});