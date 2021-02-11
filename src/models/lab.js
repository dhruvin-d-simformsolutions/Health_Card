const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const validate = require('validator');

const LabsSchema = new Schema(
  {
    labid: { type: String, required: true },
    ownerdetails: {
      fname: { type: String, required: true },
      mname: String,
      lname: { type: String, required: true },
      gender: { type: String, required: true },
      dob: String,
      //   TODO : dob type change to DOB
      licenseNumber: { type: String, required: true, unique: true },
      //   license: String,
      // TODO : upload pdf -> path -> string
    },
    password: { type: String, required: true },
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
      labmobile: { type: Number, required: true },
    },
    approved: Boolean,
  },
  { timestamps: true }
);

const Lab = mongoose.model("lab", LabsSchema);
module.exports = Lab ;
