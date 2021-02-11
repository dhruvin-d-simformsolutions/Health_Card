const mongoose = require('mongoose');
const validator = require('validator');
const {Schema} = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var PatientSchema = new Schema({
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
        // TODO : change type to date
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
    token : {
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
PatientSchema.methods.generatetokens = async function(){
    const patient = this;
    const generatedtoken = jwt.sign({ _id: patient._id.toString() }, process.env.SECRETKEYFORJWT);
    patient.token = generatedtoken;
    await patient.save();
    return generatedtoken
}

PatientSchema.statics.findByCredentials = async (healthid,password) => {
    const patient = await Patient.findOne({healthid});
    if(!patient){
        throw new Error("User is not Available");
    }
    isverify = await bcrypt.compare(password,patient.password)
    if(!isverify){
        throw new Error('Healthid and password does not match !!!');
    }
    return patient;
}

PatientSchema.pre('save',async function(next){
    const patient = this;
    if(patient.isModified('password')){
        patient.password = await bcrypt.hash(patient.password,8);
    }
    next();
})


const Patient = mongoose.model('patients', PatientSchema);
module.exports = Patient;