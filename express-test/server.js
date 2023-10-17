const express = require('express');
const bodyParser = require ("body-parser");
var https = require('https');

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

const fruits = [{name:"apple", qty: 4}, {name:"grapes", qty: 5}, {name:"banana", qty: 5}, {name:"pineapple", qty: 69}];
const url = "https://v2.jokeapi.dev/joke/Any?amount=2&format=json";
const apikey = "2840ba9141bf6cf81376153fc15e140f";

app.route("/")
.get((req, res) =>{
    console.log(__dirname);
    res.render("index", {name:"eselemu", fruits: fruits});
})
.post((req, res) =>{
    var fruit = req.body.fruit;
    var qty = req.body.qty;
    fruits.push({name: fruit, qty: qty});
    res.redirect("/");
});

app.route("/joke").get((req, res) =>{
    https.get(url, (response) =>{
        console.log(response.statusCode);
        if (response.statusCode == 200){
            response.on("data", (data) => {
                var jokes = JSON.parse(data);
                //console.log(jokes);
                res.setHeader("Content-Type", "text/html");
                jokes.jokes.forEach((joke) => {
                    console.log(joke);
                    if(joke.type == "twopart"){

                        res.write("<h2>" + joke.setup + "<h2><br/><p>"+ joke.delivery + "</p>");
                    }
                });
            });
        }
    });
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

app.use((err, req, res, next)=>{
    console.error(err.stack);
    //regular status 200
    res.status(500).send("There was an error in the app");
});

app.listen(3000, () => {
    console.log("Listening Port 3000");
});