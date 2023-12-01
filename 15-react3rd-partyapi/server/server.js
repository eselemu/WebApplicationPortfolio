const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const mongoUrl = `mongodb+srv://${user}:${password}@cluster0.6iz2suz.mongodb.net/sw?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const commentSchema = new mongoose.Schema({
    episode: String,
    name: String,
    content: String,
});
commentSchema.set("strictQuery", true);
const Comment = mongoose.model("Comment", commentSchema);


const swFilePath = "./data.js";
const sw = require(swFilePath);

app.post("/getSWData", (req, res) => {
    res.status(200).json(sw);
});

app.post("/postComment", (req, res) => {
    var comment = new Comment({
        episode: req.body.comment.episode,
        name: req.body.comment.name,
        content: req.body.comment.content,
    });
    comment.save();
    res.status(200).json(comment);
});

app.post("/getComment",  async (req, res) => {
    var commentsDB = await Comment.find({episode: req.body.episode}).exec();
    res.status(200).json(commentsDB);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("There was an error in the app");
});

app.listen(5000, () => {
    console.log("Listening Port 5000");
});