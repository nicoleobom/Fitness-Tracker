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
}