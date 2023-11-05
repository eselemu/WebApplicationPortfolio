const express = require('express');
const bodyParser = require ("body-parser");
var https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

const apikey = "a368769faa0fc47cc0f7e5e5fc9adcd6";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const api = "&appid=";

app.route("/")
.get((req, res) =>{
    res.sendFile(__dirname + "/public/html/index.html");
})
.post((req, res) =>{
    const city = req.body.cityName;
    https.get(url + city + api + apikey + "&units=metric", (response) =>{
        console.log(response.statusCode);
        if (response.statusCode == 200){
            response.on("data", (data) => {
                var response = JSON.parse(data);
                var temperature = response.main.temp;
                var description = response.weather[0].main + ": " + response.weather[0].description;
                var image = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png";
                res.render("city", { cityName: city, temperature: temperature, description: description, image: image });
            });
        }
        else{
            return res.status(500).send("Error retrieving data from city: " + city);
        }
    });
});

app.use((err, req, res, next)=>{
    console.error(err.stack);
    //regular status 200
    res.status(500).send("There was an error in the app");
});

app.listen(3000, () => {
    console.log("Listening Port 3000");
});