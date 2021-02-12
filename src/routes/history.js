const express = require('express');
const {History} = require('../models/history');
const Patient = require('../models/patient');
const {auth} = require('../middleware/auth.js')
const router = new express.Router();

router.post("/fetchinghistoryofpatient",auth,async (req, res) =>{
    const healthid = req.body.healthid
    console.log(healthid);
    try {
        const historyObject = await History.findOne({healthid})
        console.log(historyObject);
        if(!historyObject){
            throw new Error("History Not found");
        }
        res.send(historyObject)
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.post("/addhistoryofpatient",auth,async (req, res) =>{
    try {
        // console.log(req.user);
        const healthid = req.body.healthid;
        const isexist = await Patient.findOne({healthid});
        if(!isexist){
            throw new Error("Patient is not Available");
        }

        let oldhistory =await  History.findOne({healthid});
        if(!oldhistory){
            oldhistory= new History({healthid})
        }
        req.body.history.doctorid = req.user.doctorid
        oldhistory.history.push(req.body.history);
        await oldhistory.save();
        console.log(oldhistory)
        res.status(200).send(oldhistory)
    } catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = router;