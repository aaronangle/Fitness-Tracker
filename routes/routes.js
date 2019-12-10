const Workout = require("../models/workoutModel")

module.exports = function (app) {
    app.get("/", (req, res) => {
        Workout.find({}).then(data => {
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
                res.render("/")
            })
    })

    app.get("/viewWorkout/:id", (req, res) => {
        console.log(req.params.id)
        Workout.findOne({ _id: req.params.id })
            .then(result => {
                console.log(result)
                res.render("viewWorkout", { result })
            })
    })
};