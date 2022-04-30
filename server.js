const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect('mongodb://127.0.0.1:27017/necDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

const eventSchema = {
    title: String,
    date: String,
    path: String,
    overview: String
}
const Event = mongoose.model('Event', eventSchema);

const personSchema = {
    name: String,
    img: String,
    role: String,
    bio: String
}

const Person = mongoose.model('Person', personSchema);

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

app.get("/people", function (req, res) {
    res.sendFile(__dirname + "/public/people.html");
    console.log("Loading People Page")
})

app.get("/about_nec", function (req, res) {
    res.sendFile(__dirname + "/public/about_nec.html");
    console.log("Loading About NEC Page")
})

app.get("/network", function (req, res) {
    res.sendFile(__dirname + "/public/network.html");
    console.log("Loading Events Page")
});

app.get("/newsletter", function (req, res) {
    res.sendFile(__dirname + "/public/newsletter.html");
    console.log("Loading Events Page")
});

app.get("/get_all_events", function(req, res){
    Event.find(function (err, data) {
        if (err) {
            res.send({
                "message": "internal database error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    })
});

app.get('/get_event_by_id', function (req, res) {
        // console.log(req.query.movie_id);
        Event.find({"_id": req.query.event_id}, function (err, data) {
            if (err || data.length === 0) {
                res.send({
                    "message": "internal database error",
                    "data": {}
                });
            } else {
                res.send({
                    "message": "success",
                    "data": data[0]
                })
            }
        });
    });

app.get('/get_all_people', function (req, res) {
    Person.find(function (err, data) {
        if (err) {
            res.send({
                "message": "internal database error",
                "data": []
            });
        } else {
            res.send({
                "message": "success",
                "data": data
            })
        }
    })
})

