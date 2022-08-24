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

app.listen(PORT, () => {
    console.log(`Server started listening at http://localhost:${PORT}`);
});
