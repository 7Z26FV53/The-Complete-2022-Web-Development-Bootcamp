const express = require('express');
const app = express();
const bp = require('body-parser');
const date = require(__dirname + '/date.js');
// everytime require a module, it will try to get into the module
// and run all the codes inside

console.log(date);

app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended:true}));
app.use(express.static("public"));

// using const instead of var and let, means things can be appended to the list,
// but cannot change the contents inside
const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

app.get("/", function(req, res) {

    // res.render('page', ....)
    // uses the engine set at line 5 to render a certain page
    //
    // note: there's a directory called "views", which is checked
    //       by default by view engine to see if there's any files
    //       need to render
    // 
    // anything valid in .html files will be valid in .ejs files

    let day = date();

    // put all variables you want to render (even if they're unused e.g. newListItem)
    res.render("list", {listTitle: day, newListItems: items}); // so the name of the file needs to render is called list.ejs
});

// the action of the form is "/"
app.post("/", function(req, res) {
    var item = req.body.newTodoItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.listen(3000, function() {
    console.log("on port 3000");
});