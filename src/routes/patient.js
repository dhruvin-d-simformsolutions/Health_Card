const express = require("express");
const Patient = require("../models/patient");
const router = new express.Router();
const { auth } = require("../middleware/auth");

router.get('/FetchPatient',auth,async(req,res)=>{
  const id = req.query.id
  try {
    const patient = await Patient.findOne({healthid : id})
    console.log(patient);
    if(!patient){
      return res.status(404).send()
    }
    res.send(patient)
  } catch (e) {
    res.status(500).send(e.message)
  }
})
module.exports = router;