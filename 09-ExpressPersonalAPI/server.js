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

app.route("/up")
.get((req, res) =>{
    var index = parseInt(req.query.index);
    if (index == 0) {
        // Swap the first element with the last one
        var firstElement = tasks[0];
        tasks[0] = tasks[tasks.length - 1];
        tasks[tasks.length - 1] = firstElement;
    } else if (index > 0 && index < tasks.length) {
        // Swap the element at index with the element at index-1
        var temp = tasks[index];
        tasks[index] = tasks[index - 1];
        tasks[index - 1] = temp;
    }
    res.redirect("/");
});

app.route("/down")
.get((req, res) =>{
    var index = parseInt(req.query.index);

    if (index === tasks.length - 1) {
        console.log("Swapping first and last elements");
        var firstElement = tasks[0];
        tasks[0] = tasks[tasks.length - 1];
        tasks[tasks.length - 1] = firstElement;
    } else {
        console.log("Swapping element at index", index, "with element at index", index + 1);
        var temp = tasks[index];
        tasks[index] = tasks[index + 1];
        tasks[index + 1] = temp;
    } 
    res.redirect("/");
});

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("There was an error in the app");
});

app.listen(3000, () => {
    console.log("Listening Port 3000");
});