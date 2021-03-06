const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const validator = require('validator');
const {encryptPassword} = require('../utils/encrypation');

const DoctorsSchema = new Schema({
    uniqueid: {
        type: String,
        required: true,
    },
    userRole : {
        type : String,
        default : "Doctor"
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
            enum: ["Male", "Female"]
        },
        dob: String,
        //TODO :type change to DOB
        contacts: {
            mobile: {
                type: Number,
                required: true,
            },
            email: {
                type: String,
                required: true,
                trim: true,
                lowercase: true,
                validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Email is invalid");
                }
                },
            },
        },
        
    },
    licenseNumber: {
        type: String,
        unique: true,
        required: true
    },
    license: {
        type : Buffer,
    },
    password: {
        type: String,
        required: true
    },
    
    address: {
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        pincode: {
            type: Number,
            required: true,
        },
    },
    doctorDetails: {
        degree: String,
        speciality: [
            {
                type:String,
            }
        ],
    },
    hospitalContacts: {
        hospitalname: String,
        hospitalmobile: {
            type: Number,
            required: true
        }
    },
    approved: {
        type : Boolean,
        default : false
    },
    token: {
        type: String,
    },
    
    // date: Date,

}, {
    timestamps: true
})

DoctorsSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.token
    return userObject
}

DoctorsSchema.pre('save',async function(next){
    const doctor = this;
    if(doctor.isModified('password')){
        doctor.password = await encryptPassword(doctor.password);
    }
    next();
})
const Doctor = mongoose.model('doctor', DoctorsSchema,"data");
module.exports = Doctor;