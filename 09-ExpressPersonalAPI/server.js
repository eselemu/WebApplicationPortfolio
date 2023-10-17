const express = require('express');
const bodyParser = require ("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const names = [];

app.route("/")
.get((req, res) =>{
    res.render("index", { names: names });
})
.post((req, res) =>{
    res.redirect("/");
});

app.route("/greet")
.get((req, res) =>{
    var name = req.query.name;
    names.push(name);
    console.log(name);
    res.redirect("/");
});

app.route("/wazzup")
.get((req, res) =>{
    var name = req.query.name;
    res.render("wazzup", { name: name });
});

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("There was an error in the app");
});

app.listen(3000, () => {
    console.log("Listening Port 3000");
});