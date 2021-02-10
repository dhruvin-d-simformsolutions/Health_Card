const express = require('express');
const Patient = require("../models/patient");
const router = new express.Router();

router.post("/", async (req, res) => {
    const patient = new Patient(req.body)
    try {
        await patient.save();
        res.status(201).send({
            patient
        })
    } catch (e) {
        res.status(400).send(e)
    }
});

module.exports = router;
