var db = require('../models');

module.exports = function(app) {

    // get route for last workout thru api.js file
    app.get('/api/workouts', function(req, res) {
        db.Workouts.find({}).then(workout => {
            res.json(workout);
        }).catch(error => {
            res.json(error);
        })
    });

    //create new workout, post to api via json
    app.post('/api/workouts', await function(req, res) {
        try{
            const response = await db.Workouts.create({
                type: 'workout',
            });
            res.json(response);
        } catch(error) {
            console.log('Error occured when trying to create this workout. Please try again.')
        }
    });

    app.put('/api/workouts/:id', function({body, params}, res) {
        const workoutid = params.id;
        let previousExercises = [];

        db.Workouts.find({_id: workoutid}).then(dbWorkout => {
            previousExercises = dbWorkout[0].exercises;
            res.json(previousExercises);
            let totalExercises = [...savedExercises, body];
            console.log(totalExercises);
            updateWorkout(totalExercises);
        })
    })
}
