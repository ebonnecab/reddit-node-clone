const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const app = express();
const port = 3000;



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
app.get('/', (req, res) => res.render('home')
)

app.get('/posts/new', function (req, res) {
    res.render('posts-new')
})

// Post
require('./controllers/posts')(app);

app.listen(port, () => 
console.log(`Example app listening on port ${port}!`))



// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/redditclone", { useMongoClient: true });
// mongoose.connection.on(
//   "error",
//   console.error.bind(console, "MongoDB connection Error:")
// );
// mongoose.set("debug", true);