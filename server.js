const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
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

//routes
app.get('/', (req, res) => {
    Post.find({}).then(posts => {
        res.render("posts-index", { posts });
    }).catch(err => {
        console.log(err.message)
    })
})

app.get('/posts/new', function (req, res) {
    res.render('posts-new')
})

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