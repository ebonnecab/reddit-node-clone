const express = require('express')
const app = express()
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/3000",
);
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection Error:")
);
mongoose.set("debug", true);

app.get('/', function (req, res) {
    res.render('home')
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
