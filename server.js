const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3000;

// const db = require('./model');

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
                    })