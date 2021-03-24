const mongoose = require("mongoose");
const {
  Schema
} = require("mongoose");
const validator = require("validator");
const {
  encryptPassword
} = require("../utils/encrypation");

const generalMedicalAndLabSchema = new Schema({
  uniqueid: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    enum : ["Medical","Lab"]
  },
  ownerdetails: {
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
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  license: {
    type: Buffer,
  },
  password: {
    type: String,
    required: true,
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
  contacts: {
    OrgnizationName: String,
    OrganizationMobile: {
      type: Number,
      required: true,
    },
  },
  approved: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
}, {
  timestamps: true,
});

generalMedicalAndLabSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.token;
  return userObject;
};

generalMedicalAndLabSchema.pre("save", async function (next) {
  const GML = this;
  if (GML.isModified("password")) {
    GML.password = await encryptPassword(GML.password);
  }
  next();
});
const generalMedicalAndLab = mongoose.model("GeneralMedicalAndLab", generalMedicalAndLabSchema, "data");
module.exports = generalMedicalAndLab;