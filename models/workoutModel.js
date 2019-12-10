const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    workout: {
        type: String
    },
    workoutType: {
        type: String
    },
    data: [{
        workoutName: String,
        sets: Number,
        reps: Number,
        length: Number,
        calories: Number
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports = Workout;