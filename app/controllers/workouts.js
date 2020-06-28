const router = require('express').Router();
const db = require('../models');
const mongoose = require('mongoose');

// get route for all workouts
router.get('/all', function(req, res) {
    db.Workouts.find({}, function(error, data) {
        if (error) {
            res.send(error);
        } else {
            res.json(data);
        }
    })
});

//get route for workouts by id
router.get('/find/:id', function(req, res) {
    db.Exercises.findOne({
        _id: mongoose.ObjectId(req.params.id)
    }, function(error, data) {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            console.log(data);
            res.send(data);
        }
    })
})

// post route for workouts by id
router.post('/update/:id', function(req, res) {
    db.Workouts.update({
        _id: mongoose.ObjectId(req.params.id)
    }, {
        $set: {
            title: req.body.title,
            note: req.body.note,
            modified: Date.now(),
        }, function(error,data) {
            if (error) {
                res.send(error);
            } else {
                res.send(data);
            }
        }
    })
});

// delete request
router.delete('/delete/:id')