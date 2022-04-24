const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + "/public"));

app.listen(3000, function () {
    console.log("server started at 3000");
});

app.get("/", function (req, res) {
    res.sendFile("/public/index.html");
    console.log("Loading Home Page")
});

app.get("/events", function (req, res) {
    res.sendFile(__dirname + "/public/events.html");
    console.log("Loading Events Page")
});