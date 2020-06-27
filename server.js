const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3000;

const db = require('./model');

const app = express();

app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fitnessTrackerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

mongoose.connection.once('open', () => console.log('Connected!'))
                    .on('error', (error) => {
                        console.warn('Error', error);
                    });

db.Workouts.create({
    name: 'Fitness Tracker'
}).then(dbWorkouts => {
    console.log('log from dbWorkouts.create '+dbWorkouts)
}).catch(({message}) => {
    console.log('Error' + message);
});


// App
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.use(require('./controllers/exercises'));
app.use(require('./controllers/workouts'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})