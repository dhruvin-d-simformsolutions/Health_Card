const mongoose = require("mongoose");
const validator = require('validator');
const {Encryptpassword} = require('../utils/encrypation');
const {
  Schema
} = require("mongoose");
const bcrypt = require('bcryptjs');

const LabsSchema = new Schema({
  labid: {
    type: String,
    required: true
  },
  ownerdetails: {
    fname: {
      type: String,
      required: true
    },
    mname: String,
    lname: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    dob: String,
    //   TODO : dob type change to DOB
    licenseNumber: {
      type: String,
      required: true,
      unique: true
    },
    //   license: String,
    // TODO : upload pdf -> path -> string
  },
  password: {
    type: String,
    required: true
  },
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
  laboratoryContacts: {
    labname: String,
    labmobile: {
      type: Number,
      required: true
    },
  },
  approved: {
    type : Boolean,
    default : false
  },
  token: {
    type: String,
  },
}, {
  timestamps: true
});


LabsSchema.pre('save',async function(next){
  const lab = this;
    if(lab.isModified('password')){
        lab.password = await Encryptpassword(lab.password);
    }
  next();
})

LabsSchema.methods.toJSON = function(){
  const user = this
  const userObject = user.toObject()
  delete userObject.password
  delete userObject.token
  return userObject
}

const Lab = mongoose.model("lab", LabsSchema);
module.exports = Lab;

/*
{
  "changebit" : "L"
  "ownerdetails": {
      "fname": "Dhruvin",
      "mname": "Lalitbhai",
      "lname": "Dankhara",
      "gender": "Male",
      "dob": "15/07/2000",
      "licenseNumber": "1234567890",
    },
    "password": "123456789",
    "contacts": {
      "mobile": 9874563210,
      "email": "123@gmail.com"
    },
    "address": {
      "addressLine1": "String",
      "addressLine2": "String",
      "city": "Surat",
      "state": "Gujarat",
      pincode: 394101,
    },
    "laboratoryContacts": {
      "labname": "Demo",
      "labmobile": 7410369852,
    },
    "approved": false, 
}
*/