const express = require('express');
const router = express.Router();

const {
    specificEvent,
    currentEvent,
    eventType,
    addEvent,
    editEvent,
    deleteEvent,
    allDates,
    allEvents,
} = require('../controllers/event');

// create an endpoint to get all events from the API
router.get('/events', allEvents);

// endpoint for retrieving event by _id
router.get('/event/:id', specificEvent);

//create an endpoint to get the 3 most events from the API
router.get('/currentEvents', currentEvent);

// //create an endpoint to get all events by eventType (reduced Data >>> increase performance)
router.get('/allEvents', eventType);

// endpoint that will create an event document
router.post('/event', addEvent);

// Updating - editing an event - we want to use PUT
router.put('/event/:id', editEvent);

//delete an event by _id
router.delete('/event/:id', deleteEvent);

// Endpoint to get all dates
router.get('/Alldates', allDates);

module.exports = router;
