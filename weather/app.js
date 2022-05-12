const express = require('express');
const https = require("https");
const bp = require("body-parser");
const app = express();

app.use(bp.urlencoded({extended: true}));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

    // can't include more than one res.send() in one app.get()/app.post()
    // res.send(":D");
});



// !!! important !!!
// --------------------------------------------------
// upon upload/submit data to server, it triggers app.post() as well as its callback function
// inside the callback function, there is another function https.get(). it attempts to send the
// data to a third-party server (see the url ?) and get something back (the weather description we want)
app.post("/", function(req, res) {

    // must include the prefix "https://"
    const query = req.body.cityName;
    const apiKey = "35579582f70f981c2e9da5fcf576fca5";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
    
    // the approach to parse json
    https.get(url, function(response) {
        // console.log(response.statusCode);
        
        // the actual msg body we got back
        // i.e. what openWeatherMap actually sent us
        // ---------------------------------------
        // call response.on() when receive some data
        response.on("data", function(data) {
            // console.log(data); // it returns some hex codes!!!!!
            // ----------------------------------------------------
            // const wData = JSON.parse(data); ==> converse the hex code to readable form of json/js obj
            // console.log(wData);
            // ----------------------------------------------------
            // convert js obj to json:
            //
            // const obj = {
            //     name:"rein",
            //     age:21
            // }
            // console.log(JSON.stringify(obj));
            
            const wData = JSON.parse(data);
            const temp = wData.main.temp; // get this based on the structure of `wData` 
            console.log(temp);
            const desc = wData.weather[0].description;
            const icon = wData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            // send multiple lines!!!!!!!!
            res.write("<h1>Temperature in " + query + ": " + temp + " degrees celsius</h1>");
            res.write("<p>Current weather: " + desc + ".<\p>");
            res.write("<img src=" + imgURL + ">");
            res.send(); // IMPORTANT: each app method can ONLY HAVE ONE res.send()!!!!!!!!!
        });
    });
});

app.listen(3000, function() {
    console.log("im at port 3000 !");
});
