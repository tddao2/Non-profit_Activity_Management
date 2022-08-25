// import the event schema from models folder
let Event = require('../models/event');

// create an endpoint to get all events from the API
module.exports.allEvents = (req, res, next) => {
    //very plain way to get all the data from the collection through the mongoose schema
    Event.find((error, data) => {
        if (error) {
          //here we are using a call to next() to send an error message back
            return next(error)
        } else {
            res.json(data)
        }
    })
}

// endpoint for retrieving event by _id
module.exports.specificEvent = (req, res, next) => {
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
}

//create an endpoint to get the 3 most events from the API
module.exports.currentEvent = (req, res, next) => {
    //very plain way to get all the data from the collection through the mongoose schema
    Event.find((error, data) => {
        if (error) {
          //here we are using a call to next() to send an error message back
            return next(error)
        } else {
            res.json(data)
        }
    }).sort({date:-1}).limit(3) // methods of MongoDB to get the 3 most events from the API
}

// //create an endpoint to get all events by eventType (reduced Data >>> increase performance)
module.exports.eventType = (req, res, next) => {  
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
};

// endpoint that will create an event document
module.exports.addEvent =  (req, res, next) => {
    Event.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        }  else {
            // res.json(data)
            res.send('Event is added to the database');
        }
    });
};

// Updating - editing an event - we want to use PUT
module.exports.editEvent =  (req, res, next) => {
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
};

//delete an event by _id
module.exports.deleteEvent = (req, res, next) => {
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
};

// Endpoint to get all dates
module.exports.allDates = (req, res, next) => {  
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
};