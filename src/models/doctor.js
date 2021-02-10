var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

var doctorsSchema = new Schema({
    doctorid: {
        type: String,
        required: true,
    },
    details: {
        fname: {
            type: String,
            required: true,
        },
        mname: {
            type: String,
            required: true,
        },
        lname: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        licenseNumber: {
            type: String,
            unique: true,
            required: true
        },
        license: String
    },
    credentials: {
        password: {
            type: String,
            required: true
        }
    },
    contacts: {
        mobile: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    doctorDetails: {
        degree: String,
        speciality: Array,
    },
    address: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        pincode: {
            type: Number
        }
    },
    hospitalContacts: {
        hname: String,
        hmobile: {
            type: Number,
            required: true
        }
    },
    approve: Boolean,
    date: Date,


}, {
    timestamps: true
})

module.exports = mongoose.model('doctors', doctorsSchema);
