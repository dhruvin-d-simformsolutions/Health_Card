const express = require('express');
const Patient = require("../models/patient");
const {patientauth} = require('../middleware/auth');
const router = new express.Router();

router.post("/signup", async (req, res) => {
    const patient = new Patient(req.body)
    console.log(patient);
    try {
        patient.healthid = "P"+patient.details.aadharNumber;
        await patient.save();
        const token = await patient.generatetokens()
        console.log({patient,token})
        res.status(201).send({
            patient,
            token
        })
    } catch (err) {
        res.status(400).send(err.message)
    }
});


router.post('/login',async (req,res)=>{
    try{
        const patient = await Patient.findByCredentials(req.body.healthid,req.body.password);
        const token = await patient.generatetokens();
        res.status(200).send({patient,token});
    }catch(err){
        res.send(err.message);
    }
})

router.post('/logout',patientauth,async (req,res)=>{
    try {
        req.patient.token = null;
        await req.patient.save();
        res.send(
            "Logout successful"
        )
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;
