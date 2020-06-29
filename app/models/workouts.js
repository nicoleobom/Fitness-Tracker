const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
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
  }, {
    toJSON: {
      virtuals: true,
    }
  });

  WorkoutSchema.virtual('totalDuration').get(function() {
    return this.exercise.reduce((total, exercise) => {
      return total + exercise.duration;
    }, 0)
  })

const Workout = mongoose.model('workout', WorkoutSchema);

module.exports = Workout;