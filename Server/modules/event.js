// To get versions of uuid that stored as _id
const uuid = require("uuid");              
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating event schema with 3 different fields
// Events have a type, location and date stored for them
let eventSchema = new Schema ({
        //_id: Number
        _id: {
            type: String, default: uuid.v4
        },
        eventType: {
            type: String
        },
        date: {
            type: Date
        },
        location: {
            type: String
        }
    },  {
        timestamps: true             // to get createdAt and updatedAt. CreatedAT will remain until deleted. Any updates for event schema will make changes on updatedAt
    });

module.exports = mongoose.model('events', eventSchema)
