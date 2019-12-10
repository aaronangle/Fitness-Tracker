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
const viewWorkout = document.querySelectorAll(".viewWorkout")
const visualize = document.querySelectorAll(".visualize")
const repNumber = document.querySelector("#repNumber")
const setNumber = document.querySelector("#setNumber")

if (addWorkout) {
    addWorkout.addEventListener("click", function (event) {
        event.preventDefault();

        fetch("/workout", {
            method: "GET"
        }).then(() => {
            window.location.assign("/workout")
        })
    })
    viewWorkout.forEach(element => {
        element.addEventListener("click", function (event) {
            event.preventDefault();
            const id = this.getAttribute("data-id")
            fetch("/viewWorkout/" + id, {
                method: "GET"
            }).then((data) => {
                console.log(data)
                window.location.assign("/viewWorkout/" + id)
            })
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
            length.value = "";
            calories.value = "";
        } else {
            workoutData.push({
                workoutName: workoutName.value,
                reps: reps.value,
                sets: sets.value
            })
            reps.value = "";
            sets.value = "";
        }
        workoutName.value = "";
    });

    submit.addEventListener("click", function (event) {
        event.preventDefault();
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
        fetch("/postWorkout", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            console.log(res)
            window.location.assign("/")
        })
    });
}

if (visualize) {
    visualize.forEach(element => {
        element.addEventListener("click", function (event) {
            event.preventDefault();
            if (repNumber) {
                const title = this.parentNode.parentNode.childNodes[1].innerHTML;
                const rep = this.parentNode.childNodes[1].childNodes[1].innerHTML;
                const set = this.parentNode.childNodes[3].childNodes[1].innerHTML;
                var ctx = document.getElementById('myChart').getContext('2d');
                var chart = new Chart(ctx, {
                    // The type of chart we want to create
                    type: 'line',

                    // The data for our dataset
                    data: {
                        labels: ["Reps"],

                        datasets: [{
                            label: title,
                            // backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: [rep, set]
                        }]
                    },

                    // Configuration options go here
                    options: {},

                });
            }
        })
    })
}
