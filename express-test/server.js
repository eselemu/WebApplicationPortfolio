const express = require('express');
const bodyParser = require ("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");


app.get("/hello", (req, res) =>{
    res.write("<h1>HelloNOTthere</h1>");
    res.write("<ul><li>Item1</li></ul>");
    res.send();
});

app.get("/", (req, res) =>{
    console.log(__dirname);
    res.render("index", {name:"eselemu"});
});

app.route("/sellProduct").get((req, res) =>{
    var prodName = req.query.productName;
    res.write("<h1>This is a " + prodName + " product from GET</h1>");
    res.send();
}).post((req, res) =>{
    var prodName = req.body.productName;
    res.write("<h1>This is a " + prodName + " product from POST</h1>");
    res.send();
});

app.get("/sellProduct/:productName", (req, res) =>{
    var prodName = req.params.productName;
    res.write("<h1>This is a " + prodName + " product from GET 2.0</h1>");
    res.send();
});

app.listen(3000, () => {
    console.log("Listening Port 3000");
});