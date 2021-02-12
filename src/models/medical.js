const mongoose = require('mongoose');
const {Schema} = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const MedicalsSchema = new Schema({
    medicalid:{ type: String, required: true },
    ownerdetails:{
        fname:{ type: String, required: true },
        mname:String,
        lname:{ type: String, required: true },
        gender:{ type: String, required: true },
        dob:String,
        licenseNumber:{type:String,required:true,unique:true},
        license:String
    },
    password: {type: String, required: true},
    contacts: {
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        unique: true,
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
    medicalContacts:{
        medicalname:String,       
        medicalmobile:{type:Number,required:true}   
    },
    approved: Boolean,
    token: {
        type: String,
    },
    
},{timestamps:true})


MedicalsSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.token
    return userObject
}

MedicalsSchema.pre('save',async function(next){
    const medical = this;
    if(medical.isModified('password')){
        medical.password = await Encryptpassword(medical.password);
    }
    next();
})
const Medical =  mongoose.model('medical',MedicalsSchema);
module.exports = Medical;