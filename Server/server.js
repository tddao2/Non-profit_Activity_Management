const express = require("express");
const mongoose = require("mongoose"); // Require mongoose library
// Adding better longging functionality
const morgan = require("morgan");
const cors = require('cors');

const eventRoutes = require('./routes/event');
const attendeeRoutes = require('./routes/attendee');

// We will pass them as environment variables. This module helps us to load environment variables from a .env file into process.env
require("dotenv").config();   // Require the dotenv

const app = express(); //Create new instance

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
app.use(cors());
app.use(express.json()); //allows us to access request body as req.body
app.use(morgan("dev"));  //enable incoming request logging in dev mode

app.use('', eventRoutes)
app.use('', attendeeRoutes)

app.listen(PORT, () => {
    console.log("Server started listening on port : ", PORT);
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) 
        err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
