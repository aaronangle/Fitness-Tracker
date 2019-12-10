const Workout = require("../models/workoutModel")

module.exports = function (app) {
    app.get("/", (req, res) => {
        Workout.find({}).then(data => {
            console.log({ data })
            res.render("index", { data })
        })
    })

    app.get("/workout", (req, res) => {
        res.render("workout")
    })

    app.post("/newWorkout", (req, res) => {

    })

    app.get("/resistancePage", (req, res) => {
        res.render("resistance")
    })

    app.get("/cardioPage", (req, res) => {
        res.render("cardio")
    })

    app.post("/postWorkout", (req, res) => {
        Workout.create(req.body)
            .then(() => {
                console.log("worked")
            })
    })
};