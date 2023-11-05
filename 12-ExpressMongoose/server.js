const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config(); //Access from my process variable

/*INITIALIZE THE PROJECT
npm init
npm install express
npm install ejs
npm instal ejs
npm install dotenv
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

//mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }); //Structure or our schema, every parameter is a column
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const mongoUrl = `mongodb+srv://${user}:${password}@cluster0.6iz2suz.mongodb.net/f1?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }); //Structure or our schema, every parameter is a column

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  code: String,
  label: String,
  country: String,
  url: String,
});
teamSchema.set("strictQuery", true); //Mandoatory Line

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema); //First parameter: name of the "file", second one: the content of the file
const Driver = mongoose.model("Driver", driverSchema);

let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

let teamsRaw = [
  { code: "mercedes", label: "Mercedes", country: "GER" },
  { code: "ferrari", label: "Ferrari", country: "ITA" },
  { code: "red_bull", label: "Red Bull Racing", country: "AUT" },

]

let teams = []; //cache variable for teams
let drivers = [];

app.use("/", async (req, res, next) => { //MIDDLE WARE - get the code flow and then let the flow go
  //TODO: get the name of the names of the teams from the DB to show in the form
  if (teams.length === 0) {
    //load info from db
    var teamsDB = await Team.find({}).exec(); //Quering my DB in mongoose, inside {"filtering"}, exec() = execution. await = wait until i get a response
    if (!Array.isArray(teamsDB) || teamsDB.length === 0) { //!Array.isArray(teamsDB) not an array
      //I have an empty array, I nedd to populate
      await Team.insertMany(teamsRaw).then(() => {
      }).catch((error) => {
        console.error(error);
      });
      //TODO: load again records from the DB
      await Team.find({}).then((docs) => {
        console.log(docs);
        teams = docs;
      }).catch((error) => {
        console.error(error);
      });

    } else {
      teams = teamsDB;
    }
  }
  if (drivers.length === 0) {
    //load info from db
    drivers = await Driver.find({}).exec();
  }
  next(); //Let the code flow
});

app.get("/", (req, res) => {
  res.render("index", { countries, teams, drivers });
});

app.route("/driver")
.post( async (req, res) =>{
  const existingDriver = await Driver.findOne({ num: req.body.num }).exec();

  if (existingDriver) {
    return res.status(400).send("A driver with the same num already exists.");
  }
  
  var team = await Team.findOne({code: {$eq: req.body.team}}).exec();

  var driver = new Driver({
    num: req.body.num,
    code: req.body.code,
    forename: req.body.forename,
    surname: req.body.surname,
    dob: req.body.dob,
    nationality: req.body.nationality,
    url: req.body.url,
    team: team,
  });

  console.log(driver);
  driver.save();
  drivers.push(driver);
  res.redirect("/");
});

app.route("/editDriver")
.post( async (req, res) =>{
  const id = req.body.id;
  const index = parseInt(req.body.index);
  var team = await Team.findOne({code: {$eq: req.body.team}}).exec();
    try {
      // Find the existing driver by _id
      const driver = await Driver.findById(id).exec();

      if (!driver) {
        return res.status(404).send("Driver not found");
      }

      // Update the driver fields with the new values from the request
      driver.num = req.body.num;
      driver.code = req.body.code;
      driver.forename = req.body.forename;
      driver.surname = req.body.surname;
      driver.dob = req.body.dob;
      driver.nationality = req.body.nationality;
      driver.url = req.body.url;
      driver.team = team;

      // Save the updated driver document
      console.log(driver);
      await driver.save();
      drivers[index] = driver;
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating driver");
    }
});

app.route("/deleteDriver")
.post( async (req, res) =>{
  const id = req.body.id;
  const index = parseInt(req.body.index);
  try {
    // Use Mongoose to find and remove the driver document by its unique identifier
    const result = await Driver.findByIdAndDelete(id).exec();

    if (!result) {
      return res.status(404).send("Driver not found");
    }

    drivers.splice(index, 1);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting driver");
  }
});

app.use((err, req, res, next)=>{
  console.error(err.stack);
  //regular status 200
  res.status(500).send("There was an error in the app");
});

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
