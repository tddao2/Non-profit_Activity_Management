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

//create an endpoint to get all individuals information from the API
app.get('/informations', (req, res, next) => {
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

// endpoint for retrieving an information document by _id
app.get('/information/:id', (req, res, next) => {
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

//create an endpoint to know how many times and in what ways individuals have accessed events, individual's history
app.get('/trackingInfos', (req, res, next) => {
    //very plain way to get all the data from the collection through the mongoose schema
    indiv_Info.aggregate([{
            $group: {
                _id: {firstName:'$firstName',
                    lastName:'$lastName',
                    phoneNumber: '$phoneNumber',
                    zipCode: '$zipCode'
                },
                Count: {
                    $sum: 1
                },
                socialMedia: {
                    $addToSet: '$socialMedia'       // $addToSet returns an array of all unique values that results from applying an expression to each document in a group.
                },
                COVID19: {
                    $addToSet: '$COVID19'
                },
                servicesNeeding: {
                    $addToSet: '$servicesNeeding'
                },
                numOfChildren: {
                    $addToSet: '$numOfChildren'
                },
                OverAge65: {
                    $addToSet: '$OverAge65'
                },
                veteran: {
                    $addToSet: '$veteran'
                },
                Ethnicity: {
                    $addToSet: '$Ethnicity'
                },
                event: {
                    $addToSet: '$event'
                }
            }}
        ], (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error)
            } else {
                res.json(data)
            }
        })
});

//create an endpoint to know how many times and in what ways AN individual has accessed events, individual's history
app.get('/trackingInfo/:firstName&:lastName', (req, res, next) => {
    //very plain way to get all the data from the collection through the mongoose schema
    indiv_Info.aggregate([{
        $match: {                               // Using aggregation - match function to necessary data,  group them into 1 if there are documents that have the same data
            firstName: req.params.firstName,
            lastName: req.params.lastName
        }
    }, {
        $group: {
            _id: {
                firstName: '$firstName',
                lastName: '$lastName',
                phoneNumber: '$phoneNumber',
                zipCode: '$zipCode'
            },
            Count: {
                $sum: 1
            },
            socialMedia: {
                $addToSet: '$socialMedia'      // $addToSet returns an array of all unique values that results from applying an expression to each document in a group.
            },
            COVID19: {
                $addToSet: '$COVID19'
            },
            servicesNeeding: {
                $addToSet: '$servicesNeeding'
            },
            numOfChildren: {
                $addToSet: '$numOfChildren'
            },
            OverAge65: {
                $addToSet: '$OverAge65'
            },
            veteran: {
                $addToSet: '$veteran'
            },
            Ethnicity: {
                $addToSet: '$Ethnicity'
            },
            event: {
                $addToSet: '$event'
            }
        }}
        ], (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error)
            } else {
                res.json(data)
            }
        })
});

// Supervisor should be able to filter the data by zip code
app.get('/zipcodeTracking/:zipcode', (req, res, next) => {
    indiv_Info.aggregate([{
        $match: {                                  // Using aggregation to match necessary data,  group them into 1 if there are documents that have the same data
            zipCode: parseInt(req.params.zipcode)

        }
    }, {
        $group: {
            _id: {
                firstName: '$firstName',
                lastName: '$lastName',
                phoneNumber: '$phoneNumber',
                zipCode: '$zipCode'
            }
        }
    }, {
        $project: {                                // make the data that I want to display
            _id: {
                firstName: 1,
                lastName: 1
            }
        }
    }], (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error)
            } else {
                console.log(req.params.zipcode)
                res.json(data)
            }
        })
});

app.listen(PORT, () => {
    console.log(`Server started listening at http://localhost:${PORT}`);
});
