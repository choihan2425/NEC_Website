//npm i express body-parser mongoose express-session passport passport-local-mongoose
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//Initialize passport
app.use(session({
    secret: process.env.PASSPORT_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://127.0.0.1:27017/necDB',
    {useNewUrlParser: true}, function () {
        console.log("db connection successful");
    });

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "Email cannot be empty"],
        },
        password: {
            type: String,
            require: true,
            minLength: [5, "Password must be at least 5 characters"],
        },
        fullname: {
            type: String,
            required: true,
        },
        likes: [
            {
                title: String,
                date: String,
            }
        ]
    }
)
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
const eventSchema = {
    title: String,
    date: String,
    path: String,
    overview: String
}
const Event = mongoose.model('Event', eventSchema);

const courseSchema = {
    code: String,
    title: String,
    instructor: String,
    period: String,
    description: String,
    type: String
}

const Course = mongoose.model('Course', courseSchema);

const personSchema = {
    name: String,
    img: String,
    role: String,
    bio: String
}

const Person = mongoose.model('Person', personSchema);

const workSchema = {
    title: String,
    description: String,
    img: {
        type: Array
    },
    bios: {
        type: Array
    },
    video: String
}

const Work = mongoose.model('Work', workSchema);

const networkSchema = {
    title: String,
    url: String,
    overview: String
}

const Network = mongoose.model('Network', networkSchema)

app.listen(8080, function () {
    console.log("server started at 8080");
});

app.get("/", function (req, res) {
    res.sendFile("/public/index.html");
    console.log("Loading Home Page")
});

app.get('/get_current_user', function (req, res) {
    if (req.isAuthenticated()) {
        res.send({
            message: "success",
            data: req.user,
        })
    } else {
        res.send({
            message: "user not found",
            data: {},
        })
    }
});

app.get('/register', (req, res) => {
    if (req.query.error) {
        res.redirect("/register.html?error=" + req.query.error);
    } else {
        res.sendFile(__dirname + "/public/register.html");
    }
});

app.post('/register', (req, res) => {
    const newUser = {
        username: req.body.username,
        fullname: req.body.fullname,
    }

    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.redirect('/register/?error=' + err);
        } else {
            console.log(user);

            const authenticate = passport.authenticate('local');
            authenticate(req, res, () => {
                res.redirect('/')
            });
        }
    })
});
app.get('/login', (req, res) => {
    if (req.query.error) {
        res.redirect("/login.html?error=" + req.query.error);
    } else {
        res.sendFile(__dirname + "/public/login.html");
    }
});

app.post('/login', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });
    req.login(user, (err) => {
        if (err) {
            res.redirect("/login?error=database error")
        } else {
            const authenticate = passport.authenticate('local', {
                successRedirect: "/",
                failureRedirect: "/login?error=user does not exist or user name and password do not match"
            });
            authenticate(req, res);
        }
    })
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect("/");
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
    console.log("Loading Network Page")
});

app.get("/newsletter", function (req, res) {
    res.sendFile(__dirname + "/public/newsletter.html");
    console.log("Loading Newsletter Page")
});

app.get("/readings", function (req, res) {
    res.sendFile(__dirname + "/public/readings.html");
    console.log("Loading Readings Page")
});

app.get("/films", function (req, res) {
    res.sendFile(__dirname + "/public/films.html");
    console.log("Loading Films Page")
});

app.get("/nature", function (req, res) {
    res.sendFile(__dirname + "/public/nature.html");
    console.log("Loading Nature Page")
});

app.get("/intentions", function (req, res) {
    res.sendFile(__dirname + "/public/intentions.html");
    console.log("Loading Intentions Page")
});

app.get("/our_work", function (req, res) {
    res.sendFile(__dirname + "/public/our_work.html");
    console.log("Loading Our Work Page")
})

app.get("/courses", function (req, res) {
    res.sendFile(__dirname + "/public/courses.html");
    console.log("Loading NEC Courses Page")
});

app.get("/get_all_events", function (req, res) {
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

app.get('/get_person_by_id', function (req, res) {
    // console.log(req.query.movie_id);
    Person.find({"_id": req.query.person_id}, function (err, data) {
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

app.get('/get_all_works', function (req, res) {
    Work.find(function (err, data) {
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

app.get('/get_work_by_id', function (req, res) {
    // console.log(req.query.movie_id);
    Work.find({"_id": req.query.work_id}, function (err, data) {
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

app.get("/get_all_networks", function (req, res) {
    Network.find((err, data) => {
        if (err) {
            res.send({
                "message": "database error!",
                "data": []
            })
        } else {
            res.send({
                "message": "success",
                "data": data
            });
        }
    });
});

app.get('/account', (req, res) => {
    if (req.isAuthenticated()) {
        res.sendFile(__dirname + "/src/account.html");
    } else {
        res.redirect("/login");
    }
});

app.post('/like_event', (req, res) => {
    //Users need to login to like a car
    console.log(req.body)
    if (req.isAuthenticated()) {
        // save the car to the user
        const uname = req.user.username
        const event = {
            title: req.body.title,
            date: req.body.date,
        }
        console.log(req.user)
        console.log(event)
        User.updateOne(
            {
                username: uname,
                'likes.date':{$ne:event.date}
            },
            {
                $push: {
                    likes: event
                }
            },
            {},
            (err) => {
                if (err) {
                    res.send({
                        message: "database error"
                    })
                } else {
                    res.send({
                        message: "success",
                        redr: "/account",

                    })
                }
            }
        )
    } else {
        // navigate to the login page
        res.send({
            message: "login required",
            redr: "/login",
        })
    }
});


app.get('/get_current_courses', function (req, res) {
    Course.find({period: {$regex: 's22'}},function (err, data) {
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

app.get('/get_past_courses', function (req, res) {
    Course.find({period: {$ne: 's22'}},function (err, data) {
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