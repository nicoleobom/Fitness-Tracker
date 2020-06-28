const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutsSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now()
    },
    exercise: [
      {
        type: {
          type: String,
          trim: true,
          required: 'Please enter an exercise type.'
        },
        name: {
          type: String,
          trim: true,
          required: 'Please enter the name of your exercise.'
        },
        duration: {
          type: Number,
          required: 'Please enter the duration of your exercise (in minutes).'
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        }
      }
    ]
  })

const Workouts = mongoose.model('Workouts', WorkoutsSchema);

module.exports = Workouts;