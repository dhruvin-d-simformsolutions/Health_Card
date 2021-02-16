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

router.patch('/updateprofile',auth,async (req,res) => {
  
    try{
      
      // req.user = req.body;
      await req.user.save();
      res.status(200).send(req.user);
    }catch(err){
      res.status(500).send(err.message);
    }
})


module.exports = router;