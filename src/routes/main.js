const express = require("express");
const Patient = require("../models/patient");
const Medical = require("../models/medical");
const Lab = require("../models/lab");
const Doctor = require("../models/doctor");
const { auth } = require("../middleware/auth");
const { findByCredentials } = require("../utils/findByCredentials");
const { globaltokengenerator } = require("../utils/generatetoken");

const router = new express.Router();


router.post("/signup", async (req, res) => {
  // const patient = new Patient(req.body)
  // console.log(user);
  try {
    const first = req.body.changebit[0]; //TODO:P,D,L,M
    let user;
    switch (first) {
      case "P":
        user = new Patient(req.body);
        user.healthid = "P" + user.details.aadharNumber;
        break;
      case "D":
        user = new Doctor(req.body);
        user.doctorid = "D" + user.ownerdetails.licenseNumber;
        break;
      case "L":
        user = new Lab(req.body);
        user.labid = "L" + user.ownerdetails.licenseNumber;
        break;
      case "M":
        user = new Medical(req.body);
        user.medicalid = "M" + user.ownerdetails.licenseNumber;
        break;
      default:
        throw new Error("Invalid UserName !!!");
    }
    const token = await globaltokengenerator(user);
    console.log({
      user,
      token,
    });
    res.status(201).send({
      user,
      token,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await findByCredentials(req.body.username, req.body.password);
    // const patient = await Patient.findByCredentials(req.body.healthid,req.body.password);
    const token = await globaltokengenerator(user);
    // console.log({user,token});
    res.status(200).send({
      user,
      token,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/logout",auth,async (req,res)=>{
  try {
    req.user.token = null
    await req.user.save();
    res.send("Logout Successful")
    
  } catch (e) {
    res.status(500).send(e.message)
  }
})

module.exports = router;
