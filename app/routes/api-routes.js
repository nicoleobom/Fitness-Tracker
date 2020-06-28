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
    })
}

// const router = require('express').Router();
// const db = require('../models')

// router.post('/submit', ({body}, res) => {
//     console.log(body);
//     db.Exercises.create(body).then((newExercise) => {
//         console.log(newExercise);
//         return db.Workouts.findOneAndUpdate({}, { $push: {exercises: newExercise._id} }, { new: true })
//     }).then(dbWorkouts => {
//         res.json(newExercise);
//     }).catch(error => {
//         res.json(error);
//     })
// });

// router.get('/exercise', (req, res) => {
//     db.Exercises.find({}).sort({_id: 'description'})
//     .then(dbExercises => {
//         res.json(dbExercises);
//     }).catch(error => {
//         res.json(error);
//     })
// })

// // Find by ID
// router.get('/exercise/:id', (req, res) => {
//     db.Exercises.findById(req.params.id).then(result => {
//         if(!result) {
//             return res.status(404).send({
//                 message: 'Exercise not found. Invalid ID.'
//             });
//         }
//         res.send(result);
//     }).catch(error => {
//         if (error.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: 'Exercise not found. Invalid ID.'
//             })
//         }
//         return res.status(500).send({
//             message: 'Error finding exercise with that ID.'
//         })
//     })
// });

// // by noteId
// router.put('/exercise:id', (req, res) => {
//     if (!req.body.name) {
//         return res.status(400).send({
//             message: 'Exercise name cannot be empty!'
//         })
//     }

//     db.Exercises.findByIdAndUpdate(req.params.id, {
//         name: req.body.name || 'Untitled',
//         description: req.body.description,
//         difficulty: req.body.difficulty
//     }, { new: true }).then(results => {
//         if (!results) {
//             return res.status(404).send({
//                 message: 'Exercise not found. Invalid ID.'
//             });
//         }
//         res.send(results);
//     }).catch(error => {
//         if (error.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: 'Exercise not found. Invalid ID'
//             });
//         }
//         return res.status(500).send({
//             message: 'Error updating note.'
//         })
//     })
// })

// // Delete
// router.delete('/exercise/:id', (req, res) => {
//     let exID = req.params.id;
//     db.Exercises.findByIdAndRemove(req.params.id)
//     .then(results => {
//         if (!results) {
//             return res.status(404).send({
//                 message: 'Exercise not found. Invalid ID.'
//             });
//         }
//         res.send({message: 'Exercise deleted.'})
//     }).catch(error => {
//         if (error.kind === 'ObjectId' || error.name == 'NotFound') {
//             return res.status(404).send({
//                 message: 'Exercise not found with that ID.'
//             });
//         }
//         return res.status(500).send({
//             message: 'Could not delete note.'
//         })
//     })
// });

// module.exports = router;