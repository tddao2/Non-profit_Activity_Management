const express = require('express');
const router = express.Router();

// import the information on individuals schema from models folder
let indiv_Info = require('../models/information');

const {
    allAttendees,
    specificAttendee,
    attendeeHistory,
    attendeeInfo,
    eventType,
    allZipCode,
    attendeeZip,
    attendeeDate,
    joinedAttendee,
    vaccinatedAttendee,
    wantedVaccine,
} = require('../controllers/attendee');

//create an endpoint to get all individuals information from the API
router.get('/attendees', allAttendees);

// endpoint for retrieving an information document by _id
router.get('/attendee/:id', specificAttendee);

// create an endpoint to know how many times and in what ways individuals have accessed events, individual's history
router.get('/attendeeHistory/:id', attendeeHistory);

// endpoint that will create an information document
router.post('/information', attendeeInfo);

// Endpoint to get attendees by eventType
router.get('/eventType/:type', eventType);

// Endpoint to get all zipcode only
router.get('/AllzipCode', allZipCode);

// Endpoint to get attendees by zipCode
router.get('/zipCode/:zipCode', attendeeZip);

// Endpoint to get attendees by Date
router.get('/date/:date', attendeeDate);

// Endpoint to get number of attendees join events in different EventType(data for summary graph)
router.get('/AttendeesJoined', joinedAttendee);

// Endpoint to get number of attendees who RECEIVED Covid19 vaccine in different EventType(data for summary graph)
router.get('/VaccinatedAttendees', vaccinatedAttendee);

// Endpoint to get number of attendees who WANTED Covid19 vaccine in different EventType(data for summary graph)
router.get('/WantedVaccine', wantedVaccine);

module.exports = router;
