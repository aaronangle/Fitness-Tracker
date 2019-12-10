const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", { useNewUrlParser: true });


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

//routes
require("./routes/routes")(app)

app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Starting the server, syncing our models ------------------------------------/
app.listen(PORT, function () {
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
    );
});

module.exports = app;
