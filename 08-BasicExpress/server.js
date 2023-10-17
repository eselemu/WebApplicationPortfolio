const express = require('express');
const bodyParser = require ("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) =>{
    console.log(__dirname);
    res.sendFile(__dirname + "/public/html/index.html");
});

app.post("/bmi", (req, res) =>{
    var weight = req.body.weight;
    var height = req.body.height;
    res.write("<h1>Your BMI is: " + (weight / (height)^2)*10000 + "</h1>");
    res.send();
});

app.listen(3000, () => {
    console.log("Listening Port 3000");
});