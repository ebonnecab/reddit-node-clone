const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
app.engine('.handlebars', exphbs({
    extname: '.handlebars',                  // Set the file extension
    defaultLayout: 'main',            // Set a default template
}))
app.set("view engine", "handlebars");

app.get('/', (req, res) => 
res.render('home')
)

app.listen(port, () => 
console.log(`Example app listening on port ${port}!`))



// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/redditclone", { useMongoClient: true });
// mongoose.connection.on(
//   "error",
//   console.error.bind(console, "MongoDB connection Error:")
// );
// mongoose.set("debug", true);