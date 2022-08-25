// import the information on individuals schema from models folder
let indiv_Info = require('../models/information');

//create an endpoint to get all individuals information from the API
module.exports.allAttendees = (req, res, next) => {
    //very plain way to get all the data from the collection through the mongoose schema
    indiv_Info.find((error, data) => {
        if (error) {
            //here we are using a call to next() to send an error message back
            return next(error);
        } else {
            res.json(data);
        }
    });
};

// endpoint for retrieving an information document by _id
module.exports.specificAttendee = (req, res, next) => {
    indiv_Info.findOne({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else if (data === null) {
            // Sending 404 when not found something is a good practice
            res.status(404).send('Information not found');
        } else {
            res.json(data);
        }
    });
};

// create an endpoint to know how many times and in what ways individuals have accessed events, individual's history
module.exports.attendeeHistory = (req, res, next) => {
    //very plain way to get all the data from the collection through the mongoose schema
    indiv_Info.aggregate(
        [
            {
                $match: {
                    _id: req.params.id,
                },
            },
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    phoneNumber: 1,
                    socialMedia: 1,
                    zipCode: 1,
                    COVID19: 1,
                    servicesNeeding: 1,
                    numOfChildren: 1,
                    OverAge65: 1,
                    veteran: 1,
                    Ethnicity: 1,
                    Count: {
                        // if condition to get the count of events
                        $cond: {
                            if: {
                                $isArray: '$event',
                            },
                            then: {
                                $size: '$event',
                            },
                            else: 'NA',
                        },
                    },
                },
            },
        ],
        (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
};

// endpoint that will create an information document
module.exports.attendeeInfo = (req, res, next) => {
    indiv_Info.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // res.json(data)
            //   res.send('Information is added to the database');
            res.send('You have joined the event successfully. Thank you !!!');
        }
    });
};

// Endpoint to get attendees by eventType
module.exports.eventType = (req, res, next) => {
    indiv_Info.aggregate(
        [
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    phoneNumber: 1,
                    zipCode: 1,
                    event: 1,
                },
            },
            {
                $match: {
                    'event.eventType': req.params.type, // Get eventType from front-end
                },
            },
        ],
        (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
};

// Endpoint to get all zipcode only
module.exports.allZipCode = (req, res, next) => {
    indiv_Info.aggregate(
        [
            {
                $group: {
                    _id: '$zipCode', // GET all DISTINCT ZIPCODE
                },
            },
            {
                $sort: {
                    _id: 1, // THEN SORT THEM
                },
            },
        ],
        (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
};

// Endpoint to get attendees by zipCode
module.exports.attendeeZip = (req, res, next) => {
    indiv_Info.aggregate(
        [
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    phoneNumber: 1,
                    zipCode: 1,
                },
            },
            {
                $match: {
                    zipCode: parseInt(req.params.zipCode), // GET THE ZIPCODE FROM FRONT-END
                },
            },
        ],
        (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
};

// Endpoint to get attendees by Date
module.exports.attendeeDate = (req, res, next) => {
    indiv_Info.aggregate(
        [
            {
                $match: {
                    'event.date': req.params.date, // get date from front-end
                },
            },
            {
                $project: {
                    _id: 0,
                    firstName: 1,
                    lastName: 1,
                    phoneNumber: 1,
                    zipCode: 1,
                },
            },
        ],
        (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
};

// Endpoint to get number of attendees join events in different EventType(data for summary graph)
module.exports.joinedAttendee = (req, res, next) => {
    indiv_Info.aggregate(
        [
            {
                $unwind: {
                    // enables us to work with the values of the fields within an array.
                    path: '$event',
                },
            },
            {
                $group: {
                    _id: '$event',
                    count: {
                        // finding counts
                        $sum: 1,
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $arrayToObject: [
                            // convert data to an array contains object
                            [
                                {
                                    k: '$_id.eventType',
                                    v: '$count',
                                },
                            ],
                        ],
                    },
                },
            },
            {
                $sort: {
                    newRoot: -1,
                },
            },
        ],
        (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
};

// Endpoint to get number of attendees who RECEIVED Covid19 vaccine in different EventType(data for summary graph)
module.exports.vaccinatedAttendee = (req, res, next) => {
    indiv_Info.aggregate(
        [
            {
                $match: {
                    'COVID19.ReceivedVaccine': 'Yes', // Get all attendees who answered 'Yes' for ReceivedVaccine
                },
            },
            {
                $unwind: {
                    // enables us to work with the values of the fields within an array.
                    path: '$event',
                },
            },
            {
                $group: {
                    _id: '$event',
                    count: {
                        // finding counts
                        $sum: 1,
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $arrayToObject: [
                            // convert data to an array contains object
                            [
                                {
                                    k: '$_id.eventType',
                                    v: '$count',
                                },
                            ],
                        ],
                    },
                },
            },
            {
                $sort: {
                    newRoot: -1,
                },
            },
        ],
        (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
};

// Endpoint to get number of attendees who WANTED Covid19 vaccine in different EventType(data for summary graph)
module.exports.wantedVaccine = (req, res, next) => {
    indiv_Info.aggregate(
        [
            {
                $match: {
                    'COVID19.ReceivedVaccine': 'Yes', // Get all attendees who answered 'Yes' for ReceivedVaccine
                },
            },
            {
                $unwind: {
                    // enables us to work with the values of the fields within an array.
                    path: '$event',
                },
            },
            {
                $group: {
                    _id: '$event',
                    count: {
                        // finding counts
                        $sum: 1,
                    },
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $arrayToObject: [
                            // convert data to an array contains object
                            [
                                {
                                    k: '$_id.eventType',
                                    v: '$count',
                                },
                            ],
                        ],
                    },
                },
            },
            {
                $sort: {
                    newRoot: -1,
                },
            },
        ],
        (error, data) => {
            if (error) {
                //here we are using a call to next() to send an error message back
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
};
