var mongoose = require('mongoose');
const validator = require('validator');
var Schema = require('mongoose').Schema;

var patientSchema = new Schema({
    healthid: {
        type: String,
        unique: true,
        trim: true,
    },
    details: {
        fname: {
            type: String,
            required: true,
        },
        mname: String,
        lname: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        //TODO : change type to date
        dob: {
            type: String,
            required: true,
        },
        aadharNumber: {
            type: Number,
            required: true,
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
    },
    address: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        pincode: {
            type: Number,
            required: true
        },
    },
    emergencyContacts: {
        name: String,
        mobile: {
            type: Number,
            required: true
        },
        relation: String
    },
    contacts: {
        mobile: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
    },
    bodyDetails: {
        weight: Number,
        height: Number,
        alergies: [{
            type: String,
        }],
        bloodGroup: String
    },
    tokens : {
        type: String,
    }
}, {
    timestamps: true,
})
//     history: {
//         type: Array,
//         disease: String,
//         medicine: {
//             type: Array,
//             medicine1: String,
//             timedose1: String,
//             q1: Number,
//             medicine2: String,
//             timedose2: String,
//             q2: Number,
//             date: Date,
//         },
//         doctorname: String,
//         hospitalname: String,
//         lab: {
//             reportname: String,
//         },
//     }
// }, {
//     timestamps: true
// })

module.exports = mongoose.model('patients', patientSchema);