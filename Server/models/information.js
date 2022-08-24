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
        type: Array, required:true, "default" : []
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
        type: Array, required:true, "default" : []
    }
});

informationSchema.index({ firstName: 1, lastName: 1 , phoneNumber: 1}, { unique: true }); //validation for firstname, lastname, and phone number to be UNIQUE together
module.exports = mongoose.model('informations', informationSchema)
