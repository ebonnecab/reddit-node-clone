require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const Post = require("./models/post");



//middleware
app.engine('.handlebars', exphbs({
    extname: '.handlebars', 
    defaultLayout: 'main',  
}))
app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());

//routes

// Post
require('./controllers/posts')(app);

// Database
require('./data/reddit-db');

// Comment
require('./controllers/comments.js')(app);

//Auth
require("./controllers/auth.js")(app);

app.listen(port, () => 
console.log(`Example app listening on port ${port}!`))

module.exports = app;

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }

    next();
};
app.use(checkAuth);