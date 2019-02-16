const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => 
res.send('Hello World!')
)

app.listen(port, () => 
console.log(`Example app listening on port ${port}!`))

// app.engine('.hbs', exphbs({
//     extname: '.hbs',                  // Set the file extension
//     defaultLayout: 'main',            // Set a default template
// }))

// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost/redditclone", { useMongoClient: true });
// mongoose.connection.on(
//   "error",
//   console.error.bind(console, "MongoDB connection Error:")
// );
// mongoose.set("debug", true);