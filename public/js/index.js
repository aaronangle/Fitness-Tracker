const addWorkout = document.querySelector("#addWorkout");
const cardio = document.querySelector("#cardio");
const resistance = document.querySelector("#resistance");
const submit = document.querySelector("#submit")
const workoutName = document.querySelector("#workoutName");
const length = document.querySelector("#length");
const calories = document.querySelector("#calories");
const sets = document.querySelector("#sets");
const reps = document.querySelector("#reps");
const weight = document.querySelector("#weight");
const rest = document.querySelector("#rest");
const workout = document.querySelector("#workout")
const add = document.querySelector("#add")
const viewWorkout = document.querySelectorAll(".viewWorkout")
const visualize = document.querySelectorAll(".visualize")
const repNumber = document.querySelectorAll(".repNumber")
const setNumber = document.querySelectorAll(".setNumber")
const lengthNumber = document.querySelector(".lengthNumber")
const weightNumber = document.querySelectorAll(".weightNumber")
const workoutTitle = document.querySelectorAll(".workoutTitle")
const submitSearch = document.querySelector("#submitSearch")
const searchInput = document.querySelector("#searchInput")
const deleteWorkout = document.querySelectorAll(".delete")
let workoutData = [];

submitSearch.addEventListener("click", function (event) {
    event.preventDefault();
    const name = searchInput.value.trim()
    fetch("/search/" + name, {
        method: "GET"
    }).then(() => {
        window.location.assign("/search/" + name)
    })
})

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
    deleteWorkout.forEach(element => {
        element.addEventListener("click", function (event) {
            event.stopPropagation();
            event.preventDefault();
            const id = this.getAttribute("data-id")
            const data = {
                id: id
            }
            fetch("/deleteWorkout", {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                console.log(response)
                window.location.assign("/")
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
function pushData() {
    if (length) {
        workoutData.push({
            workoutName: workoutName.value,
            length: length.value,
            calories: calories.value,
            rest: rest.value
        })
        length.value = "";
        calories.value = "";
        rest.value = "";
    } else {
        workoutData.push({
            workoutName: workoutName.value,
            reps: reps.value,
            sets: sets.value,
            weight: weight.value
        })
        reps.value = "";
        sets.value = "";
        weight.value = "";
    }
    workoutName.value = ""
}
if (submit) {

    add.addEventListener("click", function (event) {
        event.preventDefault();
        pushData();
    });

    submit.addEventListener("click", function (event) {
        event.preventDefault();
        if (workoutName.value) {
            pushData();
        }
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
            workoutData.length = 0;
            window.location.assign("/")
        })
    });
}

if (visualize) {
    visualize.forEach(element => {
        element.addEventListener("click", function (event) {
            event.preventDefault();
            if (repNumber) {
                let label1 = "";
                let label2 = "";
                let label3 = "";
                if (lengthNumber) {
                    console.log("hit")
                    label1 = "Length"
                    label2 = "Calories"
                    label3 = "Rest"
                } else {
                    label1 = "Reps"
                    label2 = "Sets"
                    label3 = "Weight"
                }
                const repData = [];
                const setData = [];
                const workoutNames = [];
                const weightData = [];
                workoutTitle.forEach(element => {
                    workoutNames.push(element.innerHTML)
                })
                repNumber.forEach(element => {
                    repData.push(element.innerHTML)
                })
                setNumber.forEach(element => {
                    setData.push(element.innerHTML)
                })
                weightNumber.forEach(element => {
                    weightData.push(element.innerHTML)
                })

                var ctx = document.getElementById('myChart').getContext('2d');
                var chart = new Chart(ctx, {
                    // The type of chart we want to create
                    type: "bar",

                    // The data for our dataset
                    data: {
                        labels: workoutNames,

                        datasets: [{
                            label: label1,
                            data: repData,
                            backgroundColor: 'lightgray'
                        }, {
                            label: label2,
                            data: setData,
                            backgroundColor: 'gray'
                        }, {
                            label: label3,
                            data: weightData,
                            backgroundColor: "black"
                        }]
                    },

                    // Configuration options go here
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },

                    }

                });
            }
        })
    })
}
