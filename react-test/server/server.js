const express = require('express');
const bodyParser = require ("body-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));


app.route("/")
.get((req, res) =>{
    res.send("<h1>Hola a todos</h1>");
});

app.route("/login")
.post((req, res) =>{
    console.log(req.body)
    var user = req.body.user;
    console.log(user);
    var password = req.body.password;
    //Youd connect to a db or 3rd party to connect to the user
    let authorization = {
        user: user,
        status: "Unauthorized",
        statusCode: -1,
    }
    if(user === "eselemu" && password === "123"){
        console.log("logged");
        authorization.status = "Authorized";
        authorization.statusCode = 1;
    }
    else{
        console.log("Unauthorized")
    }
    res.json(authorization);
});

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send("There was an error in the app");
});

app.listen(5000, () => {
    console.log("Listening Port 5000");
});