const Workout = require("../models/workoutModel")

module.exports = function (app) {
    app.get("/", (req, res) => {
        Workout.find({}).sort({ _id: -1 }).then(data => {
            res.render("index", { data })
        })
    })

    app.get("/workout", (req, res) => {
        res.render("workout")
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
                res.json()
            })
    })

    app.get("/viewWorkout/:id", (req, res) => {
        Workout.findOne({ _id: req.params.id })
            .then(result => {
                res.render("viewWorkout", { result })
            })
    })

    app.get("/search/:name", (req, res) => {
        Workout.findOne({ workout: req.params.name })
            .then(result => {
                res.render("viewWorkout", { result })
            })
    })
    app.delete("/deleteWorkout", (req, res) => {
        Workout.remove({ _id: req.body.id })
            .then(result => {
                res.json();
            })
    })
};