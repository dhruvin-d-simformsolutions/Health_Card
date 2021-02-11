const express = require('express');
const Patient = require("../models/patient");
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

// router.post('/login',()=>{

// })

module.exports = router;
