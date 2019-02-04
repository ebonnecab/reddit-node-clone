const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;

//middleware
app.engine(".handlebars", exphbs({ defaultLayout: "main", extname: ".handlebars" }));
app.set("view engine", ".handlebars");


app.get("/", (req, res) => res.render("home"));

app.get("/posts/new", (req, res) => {
  res.render("posts-new")
});

app.listen(port, () => {
    console.log('App listening on port 3000!')
})

module.exports = app;