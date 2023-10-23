const express = require('express');
const bodyParser = require ("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const names = [];
const tasks = [];

app.route("/")
.get((req, res) =>{
    res.render("index", { names: names, tasks: tasks });
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
})
.put((req, res) =>{
    var name = req.query.name;
    names.push(name);
    console.log(name);
    res.status(200).json({ names: names });
});

app.route("/wazzup")
.get((req, res) =>{
    var name = req.query.name;
    res.render("wazzup", { name: name });
});

app.route("/task")
.post((req, res) =>{
    var task = req.body.task;
    tasks.push(task);
    res.redirect("/");
})
.get((req, res) =>{
    var index = req.query.index;
    tasks.splice(index, 1);
    res.redirect("/");
})
.delete((req, res) =>{
    var index = req.query.index;
    tasks.splice(index, 1);
    console.log("Hellothere from delete");
    res.redirect("/");
});

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("There was an error in the app");
});

app.listen(3000, () => {
    console.log("Listening Port 3000");
});