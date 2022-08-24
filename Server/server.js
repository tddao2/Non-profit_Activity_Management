const express = require("express");

// Require mongoose library
const mongoose = require("mongoose"); 

// Adding better longging functionality
const morgan = require("morgan");


// We will pass them as environment variables. This module helps us to load environment variables from a .env file into process.env
require("dotenv").config();   // Require the dotenv

 //Create new instance
const app = express();

// import the event schema from models folder
let Event = require('./models/event');

// import the information on individuals schema from models folder
let indiv_Info = require('./models/information');

// setting up mongoose DB connection
mongoose
    .connect(process.env.MONGO_URL)   // read environment varibale from .env
    .then(() => {
        console.log("Database connection Success!");
    })
    .catch((err) => {
        console.error("Mongo Connection Error", err);
    });

const PORT = process.env.PORT || 3000; //Declare the port number

// Allows us to access request body as req.body
app.use(express.json()); 

// Enable incoming request logging in dev mode 
app.use(morgan("dev"));  

// create an endpoint to get all events from the API
app.get('/events', (req, res, next) => {
    //very plain way to get all the data from the collection through the mongoose schema
    Event.find((error, data) => {
        if (error) {
          //here we are using a call to next() to send an error message back
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//create an endpoint to get the 3 most events from the API
app.get('/currentEvents', (req, res, next) => {
    //very plain way to get all the data from the collection through the mongoose schema
    Event.find((error, data) => {
        if (error) {
          //here we are using a call to next() to send an error message back
            return next(error)
        } else {
            res.json(data)
        }
    // }).sort({_id:-1}).limit(3)
    }).sort({createdAt:-1}).limit(3)
});

// endpoint that will create an event document
app.post('/event', (req, res, next) => {
    Event.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        }  else {
            // res.json(data)
            res.send('Event is added to the database');
        }
    });
});

// Updating - editing an event - we want to use PUT
app.put('/event/:id', (req, res, next) => {
    Event.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.send('Event is edited via PUT');
            console.log('Event successfully updated!', data)
        }
    })
});

//delete an event by _id
app.delete('/event/:id', (req, res, next) => {
    //mongoose will use location of document
    Event.findOneAndRemove({ _id: req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        //  res.send('Event is deleted');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server started listening at http://localhost:${PORT}`);
});
