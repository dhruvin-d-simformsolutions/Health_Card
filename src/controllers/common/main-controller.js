const Patient = require("../../models/patient");
const Medical = require("../../models/medical");
const Lab = require("../../models/lab");
const Doctor = require("../../models/doctor");

const { loginSchema,signUpSchema } = require("../../validation/loginSchema");
// var csrf = require('csurf')
const { findByCredentials } = require("../../utils/findByCredentials");
const { globalTokenGenerator } = require("../../utils/generateToken");
const { Encryptpassword } = require("../../utils/encrypation");
// const {mailservice} = require('../utils/mailService');
const { mailRegistration, mailforgetpassword } = require("../../utils/mailService");

exports.SingUp = async (req, res) => {
  try {
    const validation = await signUpSchema.validateAsync(req.body)
    const first = req.body.changebit[0]; //TODO:P,D,L,M
    let user;
    switch (first) {
      case "P":
        user = new Patient(req.body);
        user.healthid = "P" + user.details.aadharNumber;
        // mailRegistration(user.contacts.email,"Patient",user.details.fname,user.details.lname,user.healthid)
        // mailservice(user.contacts.email,"Patient",user.details.fname,user.details.lname,user.healthid)
        break;
      case "D":
        user = new Doctor(req.body);
        user.doctorid = "D" + user.details.licenseNumber;
        // mailRegistration(user.contacts.email,"Doctor",user.details.fname,user.details.lname,user.doctorid)
        break;
      case "L":
        user = new Lab(req.body);
        user.labid = "L" + user.ownerdetails.licenseNumber;
        // mailRegistration(user.contacts.email,"Lab",user.ownerdetails.fname,user.ownerdetails.lname,user.labid)
        break;
      case "M":
        user = new Medical(req.body);
        user.medicalid = "M" + user.ownerdetails.licenseNumber;
        // mailRegistration(user.contacts.email,"Medical",user.ownerdetails.fname,user.ownerdetails.lname,user.medicalid)
        break;
      default:
        throw new Error("Invalid UserName !!!");
    }
    const token = await globalTokenGenerator(user);
    // mailservice(user.)
    res.status(201).send({
      user,
      token,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.Login = async (req, res) => {
  try {
    const validation = await loginSchema.validateAsync(req.body);
    console.log(result);
    const user = await findByCredentials(req.body.username, req.body.password);
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    const token = await globalTokenGenerator(user);
    // console.log({user,token});
    res.status(200).send({
      user,
      token,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.Logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });
    req.user.token = undefined;
    await req.user.save();
    res.send("Logout Successful");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

exports.GetProfile = async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send(err.meassage);
  }
};

exports.ForgetPassword = async (req, res) => {
  try {
    const { id } = req.body;
    const temporaryPassword = generator.generate({
      length: 10,
      numbers: true,
      lowercase: true,
      uppercase: true,
    });
    // console.log(email,role[0]);
    let userObject;
    switch (id[0]) {
      case "P":
        // userObject = await Patient.findOne({ "contacts.email" : email })
        userObject = await Patient.findOne({
          healthid: id,
        });
        if (userObject) {
          mailforgetpassword(
            userObject.contacts.email,
            userObject.details.fname,
            userObject.details.lname,
            userObject.healthid,
            temporaryPassword
          );
        }
        break;
      case "D":
        userObject = await Doctor.findOne({
          doctorid: id,
        });
        if (userObject) {
          mailforgetpassword(
            userObject.contacts.email,
            userObject.details.fname,
            userObject.details.lname,
            userObject.doctorid,
            temporaryPassword
          );
        }
        break;
      case "L":
        userObject = await Lab.findOne({
          labid: id,
        });
        if (userObject) {
          mailforgetpassword(
            userObject.contacts.email,
            userObject.ownerdetails.fname,
            userObject.ownerdetails.lname,
            userObject.labid,
            temporaryPassword
          );
        }
        // console.log(userObject);
        break;
      case "M":
        userObject = await Medical.findOne({
          medicalid: id,
        });
        if (userObject) {
          mailforgetpassword(
            userObject.contacts.email,
            userObject.ownerdetails.fname,
            userObject.ownerdetails.lname,
            userObject.medicalid,
            temporaryPassword
          );
        }
        break;
      default:
        throw new Error("Invalid UserName !!!");
    }

    if (!userObject) {
      throw new Error("Email Dose Not Found!!!");
    }
    // $2a$08$c1NYXIo3U.C/MPPmjVkkheiXeMKq/mCwGCjhlsIVKmdj2h6ErVlwi = 123456789

    //TODO : Sending Email to User with temporary password

    userObject.password = await Encryptpassword(temporaryPassword);
    // console.log(temporaryPassword,userObject.password);
    // mailsent();
    await userObject.save();
    res.send(userObject);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

(exports.UploadPDF = async (req, res) => {
  if (req.user.details.license) {
    req.user.details.license = req.file.buffer;
  } else {
    req.user.ownerdetails.license = req.file.buffer;
  }
  await req.user.save();
  res.send();
}),
  (error, req, res, next) => {
    res.status(400).send({
      error: error.message,
    });
  };
