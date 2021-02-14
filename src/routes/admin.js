const express = require('express');
const Medical = require("../models/medical");
const Lab = require("../models/lab");
const Doctor = require("../models/doctor");
const router = new express.Router();


//Fetching Pending Doctors, Medicals ans Labs
router.get('/pendingdoctors',async (req,res)=>{
    try {
        const PendingDoctors = await Doctor.find({approved:false});
        console.log(PendingDoctors);    
        res.status(200).send(PendingDoctors);
        
    } catch (e) {
        req.statu(500).send(e.message)
    }
})

router.get('/pendinglabs',async (req,res)=>{
    try {
        const PendingLabs = await Lab.find({approved:false});
        console.log(PendingLabs);    
        res.status(200).send(PendingLabs);
        
    } catch (e) {
        req.statu(500).send(e.message)
    }
})

router.get('/pendingMedicals',async (req,res)=>{
    try {
        const PendingMedicals = await Medical.find({approved:false});
        console.log(PendingMedicals);    
        res.status(200).send(PendingMedicals);
        
    } catch (e) {
        req.statu(500).send(e.message)
    }
})


//Either Approving or Rejection
//TODO : sent mail according to tx.
router.patch('/doctorapproved',async (req,res) => {

    const {doctorid,approved} = req.body; //approved --> 1,rejection --> 0
    try {
        if(approved){
            await Doctor.updateOne({doctorid},{$set:{approved : true}});
            res.status(200).send("Successfully Approved");
        }else{
            await Doctor.deleteOne({doctorid});
            res.status(200).send("Successfully DisApproved");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
})


router.patch('/labapproved',async (req,res) => {
    const {labid,approved} = req.body; //approved --> 1,rejection --> 0
    try {
        if(approved){
            await Lab.updateOne({labid},{$set:{approved : true}});
            res.status(200).send("Successfully Approved");
        }else{
            await Lab.deleteOne({labid});
            res.status(200).send("Successfully DisApproved");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
})

router.patch('/medicalapproved',async (req,res) => {
    const {medicalid,approved} = req.body; //approved --> 1,rejection --> 0
    try {
        if(approved){
            await Medical.updateOne({medicalid},{$set:{approved : true}});
            res.status(200).send("Successfully Approved");
        }else{
            await Medical.deleteOne({medicalid});
            res.status(200).send("Successfully DisApproved");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
})

module.exports = router;