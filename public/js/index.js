import { set } from "mongoose";

const addWorkout = document.querySelector("#addWorkout");
const cardio = document.querySelector("#cardio");
const resistance = document.querySelector("#resistance");
const submit = document.querySelector("#submit")
const workoutName = document.querySelector("#workoutName");
const length = document.querySelector("#length");
const calories = document.querySelector("#calories");
const sets = document.querySelector("#sets");
const reps = document.querySelector("#reps");
const workout = document.querySelector("#workout")
const add = document.querySelector("#add")

if (addWorkout) {
    addWorkout.addEventListener("click", function (event) {
        event.preventDefault();

        fetch("/workout", {
            method: "GET"
        }).then(() => {
            window.location.assign("/workout")
        })
    })
}

if (cardio) {
    cardio.addEventListener("click", function (event) {
        event.preventDefault();
        fetch("/cardioPage", {
            method: "GET"
        }).then(() => {
            window.location.assign("/cardioPage")
        })
    })

    resistance.addEventListener("click", function (event) {
        event.preventDefault();
        fetch("/resistancePage", {
            method: "GET"
        }).then(() => {
            window.location.assign("/resistancePage")
        })
    })

}

if (submit) {
    const workoutData = []
    add.addEventListener("click", function (event) {
        event.preventDefault();
        if (length) {
            workoutData.push({
                workoutName: workoutName.value,
                length: length.value,
                calories: calories.value
            })
            length.innerText = "";
            calories.innerText = "";
        } else {
            workoutData.push({
                workoutName: workoutName.value,
                reps: reps.value,
                sets: sets.value
            })
            reps.innerText = "";
            sets.innerText = "";
        }

    })

    submit.addEventListener("click", function (event) {
        event.preventDefault();
        console.log(workoutName.value)
        let data;
        if (length) {
            data = {
                workout: workout.value,
                workoutType: "cardio",
                data: workoutData
            }
        } else {
            data = {
                workout: workout.value,
                workoutType: "resistance",
                data: workoutData
            }
        }
        console.log(data)
        fetch("/postWorkout", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res)
        })
    })
}
