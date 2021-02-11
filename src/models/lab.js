const mongoose = require("mongoose");
const validator = require('validator');
const {
  Schema
} = require("mongoose");
const validate = require('validator');

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
  approved: Boolean,
  token: {
    type: String,
  },
}, {
  timestamps: true
});

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