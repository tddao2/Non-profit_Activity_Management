const uuid = require("uuid");        // To get versions of uuid that stored as _id
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Creating informations schema with necessary fields to get individuals's history with events they accessed
let informationSchema = new Schema ({
    _id: {type: String, default: uuid.v1},
    firstName: {                                     // 1. First Name 
        type: String, required:true, trim: true
    },
    lastName: {                                      // 2. Last Name
        type: String, required:true, trim: true
    },
    phoneNumber: {                                   // 3. Phone Number
        type: String, required:true
    },
    socialMedia: {                                   // 4. How did you hear about our distribution?
        type: String, required:true
    },
    zipCode: {                                       // 5. Zip Code
        type: Number, required:true
    },
    COVID19: {
        WantedCOVIDvaccine: {                        // 6. Would you like the COVID vaccine on during the distribution?
            type: String, required:true                         
        },
        TypeOfVaccine: {                             // 7. Which COVID vaccine would you prefer to receive?
            type: String, trim: true, default: null
        },
        ReceivedVaccine: {
            type: String, default: null              // 8. Have you received the COVID vaccine?
        }
    },
    servicesNeeding: {                               // 9. Are you in need of additional supportive services (e.g., utility assistance, rental assistance, housing, nutritional support, etc.)?
        type: String, required:true
    },
    numOfChildren: {                                 // 10. Number of Children In Household
        type: Number, default: 0
    },
    OverAge65: {                                     // 11. Are you or anyone in your household 65+ in age?
        type: String, required:true
    },
    veteran: {                                       // 12. Are you a veteran?
        type: String, required:true
    },
    Ethnicity: {                                     // 13. Which of the following best describes you?
        type: String, required:true
    },
    event: {
        eventType: {type: String, default: null},
        date: {type: Date, default: null},
        location: {type: String, default: null}
    }
},  {
    timestamps: true           // to get createdAt and updatedAt. CreatedAT will remain until deleted. Any updates for event schema will make changes on updatedAt
});

module.exports = mongoose.model('informations', informationSchema)
