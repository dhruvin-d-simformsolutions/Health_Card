const express = require("express");
const Patient = require("../models/patient");
const router = new express.Router();
const {
  patientauth
} = require("../middleware/auth");
const {
  globaltokengenerator
} = require("../utils/generatetoken");

router.post("/signup", async (req, res) => {
  const patient = new Patient(req.body);
  console.log(patient);
  try {
    patient.healthid = "P" + patient.details.aadharNumber;
    // await patient.save();
    const token = await globaltokengenerator(patient);
    console.log({
      patient,
      token,
    });
    res.status(201).send({
      patient,
      token,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});


router.post('/logout',patientauth,async (req,res)=>{
  try {
    req.patient.token = null
    await req.  patient.save();
    res.send("Logout Successful")
  } catch (e) {
    res.status(500).send(e.message)
  }
})


module.exports = router;