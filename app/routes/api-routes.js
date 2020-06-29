var db = require("../models");

module.exports = function(app) {

    // Used by api.js to get last workout
    app.get("/api/workout", (req, res) => {
        db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    });
    
    // Creates a new workout in the workout database
    app.post("/api/workouts", async (req, res)=> {
        try{
            const response = await db.Workout.create({type: "workout"})
            res.json(response);
        }
        catch(err){
            console.log("error occurred creating a workout: ", err)
        }
    })

    // Used by api.js to add an exercise to a workout
    app.put("/api/workouts/:id", ({body, params}, res) => {
        // console.log(body, params)
        const workoutId = params.id;
        let savedExercises = [];

        // gets all the currently saved exercises in the current workout
        db.Workout.find({_id: workoutId})
            .then(dbWorkout => {
                // console.log(dbWorkout)
                savedExercises = dbWorkout[0].exercises;
                res.json(dbWorkout[0].exercises);
                let allExercises = [...savedExercises, body]
                console.log(allExercises)
                updateWorkout(allExercises)
            })
            .catch(err => {
                res.json(err);
            });

        function updateWorkout(exercises){
            db.Workout.findByIdAndUpdate(workoutId, {exercises: exercises}, function(err, doc){
            if(err){
                console.log(err)
            }

            })
        }
            
    })

    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            res.json(err);
        });
    }); 
};

// var db = require('../models');

// module.exports = function(app) {

//     app.get('/api/workouts', function(req, res) {
//         db.Workouts.find({})
//         .then(workout => {
//             res.json(workout);
//         }).catch(error => {
//             res.json(error);
//         });
//     });

//     // create new workout, post to api via json
//     app.post("/api/workouts", async (req, res) => {
//         try{
//             const response = await db.Workouts.create({type: "workout"})
//             res.json(response);
//         }
//         catch(err){
//             console.log("error occurred creating a workout: ", err)
//         }
//     })

//     app.put('/api/workouts/:id', function({body, params}, res) {
//         const workoutid = params.id;
//         let previousExercises = [];

//         db.Workouts.find({_id: workoutid})
//         .then(dbWorkout => {
//             previousExercises = dbWorkout[0].exercises;
//             res.json(previousExercises);
//             let totalExercises = [...savedExercises, body];
//             console.log(totalExercises);
//             updateWorkout(totalExercises);
//         }).catch(error => {
//             res.json(error);
//         });

//         function updateWorkout(exercises) {
//             db.Workouts.findByIdAndUpdate(workoutid, {exercises: exercises}, function(error) {
//                 if(error) {
//                     console.log(error);
//                 }
//             })
//         }
//     })

//     app.get('/api/workouts/range', function(req, res) {
//         db.Workouts.find({}).then(workout => {
//             res.json(workout);
//         }).catch(error => {
//             res.json(error);
//         })
//     })
// }
