const express = require('express');
const bodyParser = require ("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

var name = "";
const posts = [];
var id = 0;

app.route("/")
.get((req, res) =>{
    res.render("index", { alertMessage: "" });
})
.post((req, res) =>{
    res.redirect("/");
});

app.route("/login")
.get((req, res) =>{
    name = req.query.name;
    res.render("login", {name: name, secure: "GET method, not so secure."});
})
.post((req, res) =>{
    name = req.body.name;
    res.render("login", {name: name, secure: "POST method, more secure."});
});

app.route("/home")
.get((req, res) =>{
    if (name != ""){
        res.render("home", {name: name, posts: posts});
    }
    else{
        res.render("index", { alertMessage: "Username not defined!" });
    }
}).post((req, res) =>{
    var title = req.body.title;
    var content = req.body.content;
    posts.push({title:title, content: content, name: name, id: id});
    id += 1;
    res.redirect("/home");
});

app.route("/post")
.post((req, res) =>{
    var idPost = req.body.id;
    var shPost;
    posts.forEach((post)=>{
        if(post.id == idPost){
            shPost = post;
        }
    });
    res.render("post", {post: shPost});
});

app.route("/edit")
.post((req, res) =>{
    var idPost = req.body.id;
    var title = req.body.title;
    var content = req.body.content;
    posts.forEach((post)=>{
        if(post.id == idPost){
            post.title = title;
            post.content = content;
        }
    });
    res.redirect("/home");
});

app.route("/delete")
.post((req, res) =>{
    var idPost = req.body.id;
    var index;
    posts.forEach((post)=>{
        if(post.id == idPost){
            index = posts.indexOf(post);
        }
    });
    posts.splice(index, 1);
    res.redirect("/home");
});

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("There was an error in the app");
});

app.listen(3000, () => {
    console.log("Listening Port 3000");
});