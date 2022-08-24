const express = require("express");
const mongoose = require("mongoose"); // Require mongoose library
// Adding better longging functionality
const morgan = require("morgan");
const cors = require('cors');

// We will pass them as environment variables. This module helps us to load environment variables from a .env file into process.env
require("dotenv").config();   // Require the dotenv

const app = express(); //Create new instance

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
app.use(cors());
app.use(express.json()); //allows us to access request body as req.body
app.use(morgan("dev"));  //enable incoming request logging in dev mode

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

// >>>>>>>>Added new endpoint<<<<<<<<<
// endpoint for retrieving event by _id
app.get('/event/:id', (req, res, next) => {
    Event.findOne({ _id: req.params.id}, (error, data) => {
        if (error) {
            return next(error)
        } else if (data === null) {
            // Sending 404 when not found something is a good practice
          res.status(404).send('Event not found');
        }
        else {
          res.json(data)
        }
    });
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
    }).sort({date:-1}).limit(3) // methods of MongoDB to get the 3 most events from the API
});

// >>>>>>>>Added new endpoint<<<<<<<<<
// //create an endpoint to get all events by eventType (reduced Data >>> increase performance)
app.get('/allEvents', (req, res, next) => {  
    Event.aggregate([{
        $project: {
            _id: 0,
            eventType: 1
        }
    }, {
        $group: {               // Get all DISTINCT eventType.
            _id: '$eventType'
        }
    }, {
        $sort: {
            _id: 1              // Get all DISTINCT eventType in alphabetical order to be displayed in client side
        }
    }], (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error)
            } else {
                res.json(data)
            }
        })
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

// >>>>>>>>Changed name of endpoint<<<<<<<<<
//create an endpoint to get all individuals information from the API
app.get('/attendees', (req, res, next) => {
    //very plain way to get all the data from the collection through the mongoose schema
    indiv_Info.find((error, data) => {
        if (error) {
            //here we are using a call to next() to send an error message back
            return next(error)
        } else {
            res.json(data)
        }
    })
});
// >>>>>>>>Changed name of endpoint<<<<<<<<<
// endpoint for retrieving an information document by _id
app.get('/attendee/:id', (req, res, next) => {
    indiv_Info.findOne({ _id: req.params.id}, (error, data) => {
        if (error) {
            return next(error)
        } else if (data === null) {
            // Sending 404 when not found something is a good practice
            res.status(404).send('Information not found');
        }
        else {
            res.json(data)
        }
    });
});

// >>>>>>>>Added an new endpoint<<<<<<<<<
// create an endpoint to know how many times and in what ways individuals have accessed events, individual's history
app.get('/attendeeHistory/:id', (req, res, next) => {
    //very plain way to get all the data from the collection through the mongoose schema
    indiv_Info.aggregate([{
        $match: {
            '_id': req.params.id
        }
    }, {
        $project: {
            'firstName': 1,
            'lastName': 1,
            'phoneNumber': 1,
            'socialMedia': 1,
            'zipCode': 1,
            'COVID19': 1,
            'servicesNeeding': 1,
            'numOfChildren': 1,
            'OverAge65': 1,
            'veteran': 1,
            'Ethnicity': 1,
            'Count': {        // if condition to get the count of events 
                $cond: {
                    if: {
                        $isArray: '$event'
                    },
                    then: {
                        $size: '$event'
                    },
                    else: 'NA'
                }
            }
        }
    }
    ], (error, data) => {
        if (error) {
            //here we are using a call to next() to send an error message back
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// endpoint that will create an information document
app.post('/information', (req, res, next) => {
  indiv_Info.create(req.body, (error, data) => {
      if (error) {
          return next(error)
      }   else {
          // res.json(data)
        //   res.send('Information is added to the database');
          res.send('You have joined the event successfully. Thank you !!!');
      }
  });
});

// >>>>>>>>Added an new endpoint<<<<<<<<<
// Endpoint to get attendees by eventType
app.get('/eventType/:type', (req, res, next) => {  
    indiv_Info.aggregate([{
        $project: {
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
            zipCode: 1,
            event: 1
        }
    }, {
        $match: {
            'event.eventType': req.params.type         // Get eventType from front-end
        }
    }], (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error)
            } else {
                res.json(data)
            }
        })
});

// >>>>>>>>Added an new endpoint<<<<<<<<<
// Endpoint to get all zipcode only
app.get('/AllzipCode', (req, res, next) => {  
    indiv_Info.aggregate([{
        $group: {
            _id: "$zipCode"         // GET all DISTINCT ZIPCODE
        }
    }, {
        $sort: {
            _id: 1                  // THEN SORT THEM
        }
    }], (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error)
            } else {
                res.json(data)
            }
        })
});

// >>>>>>>>Added an new endpoint<<<<<<<<<
// Endpoint to get attendees by zipCode
app.get('/zipCode/:zipCode', (req, res, next) => {  
    indiv_Info.aggregate([{
        $project: {
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
            zipCode: 1
        }
    }, {
        $match: {
            'zipCode': parseInt(req.params.zipCode)       // GET THE ZIPCODE FROM FRONT-END
        }
    }], (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error)
            } else {
                res.json(data)
            }
        })
});

// >>>>>>>>Added an new endpoint<<<<<<<<<
// Endpoint to get all dates
app.get('/Alldates', (req, res, next) => {  
    Event.aggregate([{
        $project: {
            _id: 0,
            date: 1
        }
    }, {
        $group: {               // GET all DISTINCT DATE
            _id: '$date'
        }
    }, {
        $sort: {
            _id: 1              // THEN SORT THE DATE
        }
    }], (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error)
            } else {
                res.json(data)
            }
        })
});
// >>>>>>>>Added an new endpoint<<<<<<<<<
// Endpoint to get attendees by Date
app.get('/date/:date', (req, res, next) => {  
    indiv_Info.aggregate([{
        $match: {
            'event.date': req.params.date     // get date from front-end
        }
    }, {
        $project: {
            _id: 0,
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
            zipCode: 1
        }
    }], (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error)
            } else {
                res.json(data)
            }
        })
});

// >>>>>>>>Added an new endpoint<<<<<<<<<
// Endpoint to get number of attendees join events in different EventType(data for summary graph)
app.get('/AttendeesJoined', (req, res, next) => {  
    indiv_Info.aggregate([{
        $unwind: {                   // enables us to work with the values of the fields within an array.
            path: '$event'
        }
    }, {
        $group: {
            _id: '$event',
            count: {                        // finding counts
                '$sum': 1
            }
        }
    }, {
        $replaceRoot: {
            newRoot: {
                '$arrayToObject': [           // convert data to an array contains object
                    [{
                        'k': '$_id.eventType',
                        'v': '$count'
                    }]
                ]
            }
        }
    }, {
        $sort: {
            newRoot: -1
        }
    }], (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error)
            } else {
                res.json(data)
            }
        })
});

// >>>>>>>>Added an new endpoint<<<<<<<<<
// Endpoint to get number of attendees who RECEIVED Covid19 vaccine in different EventType(data for summary graph)
app.get('/VaccinatedAttendees', (req, res, next) => {  
    indiv_Info.aggregate([{
        $match: {
            "COVID19.ReceivedVaccine": 'Yes'       // Get all attendees who answered 'Yes' for ReceivedVaccine
        }
    }, {
        $unwind: {                          // enables us to work with the values of the fields within an array.
            path: '$event'
        }
    }, {
        $group: {
            _id: '$event',
            count: {                       // finding counts
                '$sum': 1 
            }
        }
    }, {
        $replaceRoot: {
            newRoot: {
                '$arrayToObject': [           // convert data to an array contains object
                    [{
                        'k': '$_id.eventType', 
                        'v': '$count'
                    }]
                ]
            }
        }
    }, {
        $sort: {
            newRoot: -1
        }
    }], (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error)
            } else {
                res.json(data)
            }
        })
});

// >>>>>>>>Added an new endpoint<<<<<<<<<
// Endpoint to get number of attendees who WANTED Covid19 vaccine in different EventType(data for summary graph)
app.get('/WantedVaccine', (req, res, next) => {  
    indiv_Info.aggregate([{
        $match: {
            "COVID19.WantedCOVIDvaccine": 'Yes'  // Get all attendees who answered 'Yes' for WantedCOVIDvaccine
        }
    }, {
        $unwind: {                    // enables us to work with the values of the fields within an array.
            path: '$event'
        }
    }, {
        $group: {
            _id: '$event',
            count: {                  // finding counts
                '$sum': 1
            }
        }
    }, {
        $replaceRoot: {               // convert data to an array contains object
            newRoot: {
                '$arrayToObject': [
                    [{
                        'k': '$_id.eventType',
                        'v': '$count'
                    }]
                ]
            }
        }
    }, {
        $sort: {
            newRoot: -1
        }
    }], (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error)
            } else {
                res.json(data)
            }
        })
});

app.listen(PORT, () => {
    console.log("Server started listening on port : ", PORT);
});

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) 
        err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
