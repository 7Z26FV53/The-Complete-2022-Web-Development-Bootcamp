const express = require('express');
const bp = require('body-parser');
const request = require('request');
const app = express();
const https = require('https');

app.use(bp.urlencoded({extended:true}));

app.use(express.static("public")); // !!!! allow using static files like css and img !!!!

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    var userData = {
        members: {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    }

    const jsonData = JSON.stringify(userData);
    const url = "https://us13.api.mailchimp.com/3.0/lists/8a53447a51";
    const options = {
        method: "POST",
        auth: "r:171daac86acc7708547d7744d87cd602-us13"
    }

    // Makes a request to a secure web server.
    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end(); // Finishes sending the request
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

// a dynamic port chosen by heroku
app.listen(process.env.PORT || 3000, function() {
    console.log("running on port 3000");
});

// api key : 171daac86acc7708547d7744d87cd602-us13
// audience id : 8a53447a51