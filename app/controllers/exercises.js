const router = require('express').Router();
const db = require('../app/models')

router.post('/submit', ({body}, res) => {
    console.log(body);
    db.Exercises.create(body).then((newExercise) => {
        console.log(newExercise);
        return db.Workouts.findOneAndUpdate({}, { $push: {exercises: newExercise._id} }, { new: true })
    }).then(dbWorkouts => {
        res.json(newExercise);
    }).catch(error => {
        res.json(error);
    })
});

router.get('/exercises', (req, res) => {
    db.Exercises.find({}).sort({_id: 'description'})
    .then(dbExercises => {
        res.json(dbExercises);
    }).catch(error => {
        res.json(error);
    })
})

// Find by ID
router.get('/exercises/:id', (req, res) => {
    db.Exercises.findById(req.params.id).then(result => {
        if(!result) {
            return res.status(404).send({
                message: 'Exercise not found. Invalid ID.'
            });
        }
        res.send(result);
    }).catch(error => {
        if (error.kind === 'ObjectId') {
            return res.status(404).send({
                message: 'Exercise not found. Invalid ID.'
            })
        }
        return res.status(500).send({
            message: 'Error finding exercise with that ID.'
        })
    })
});