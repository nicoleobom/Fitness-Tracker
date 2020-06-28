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

    // add exercises to workouts
        // gets currently saved exercises within selected workout

    // get all workouts
}
