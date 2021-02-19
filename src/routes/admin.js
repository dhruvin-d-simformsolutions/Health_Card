const express = require('express');
const Medical = require("../models/medical");
const Doctor = require('../models/doctor');
const Lab = require("../models/lab");
const { mailadminappoved } = require('../utils/mailService');
const router = new express.Router();


//Fetching Pending Doctors, Medicals ans Labs
router.get('/pendingdoctors',async (req,res)=>{
    try {
        const PendingDoctors = await Doctor.find({approved:false})
        res.status(200).send(PendingDoctors);
        
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/pendinglabs',async (req,res)=>{
    try {
        const PendingLabs = await Lab.find({approved:false});
        console.log(PendingLabs);    
        res.status(200).send(PendingLabs);
        
    }catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/pendingMedicals',async (req,res)=>{
    try {
        const PendingMedicals = await Medical.find({approved:false});
        console.log(PendingMedicals);    
        res.status(200).send(PendingMedicals);
        
    } catch (e) {
        res.status(500).send(e.message)
    }
})


//Either Approving or Rejection
//TODO : sent mail according to tx.
router.patch('/doctorapproved',async (req,res) => {

    const {doctorid,approved} = req.body; //approved --> 1,rejection --> 0
    try {
        
        const doctor = await Doctor.findOne({doctorid,approved:false});
        if(!doctor){
            throw new Error("Doctor Not Found")
        }

        if(approved){
            await Doctor.updateOne({doctorid},{$set:{approved : true}});
            mailadminappoved(doctor.contacts.email,doctor.details.fname,doctor.details.lname,doctorid,1);
            res.status(200).send("Successfully Approved");
        }else{
            await Doctor.deleteOne({doctorid});
            mailadminappoved(doctor.contacts.email,doctor.details.fname,doctor.details.lname,doctorid,0);
            res.status(200).send("Successfully DisApproved");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
})


router.patch('/labapproved',async (req,res) => {
    const {labid,approved} = req.body; //approved --> 1,rejection --> 0
    const lab = await Lab.findOne({labid,approved:false})
    if(!lab){
        throw new Error('Lab Not Found');
    }
    try {
        if(approved){
            await Lab.updateOne({labid},{$set:{approved : true}});
            mailadminappoved(lab.contacts.email,lab.ownerdetails.fname,lab.ownerdetails.lname,labid,1);
            res.status(200).send("Successfully Approved");
        }else{
            await Lab.deleteOne({labid});
            res.status(200).send("Successfully DisApproved");
            mailadminappoved(lab.contacts.email,lab.ownerdetails.fname,lab.ownerdetails.lname,labid,0);
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
})

router.patch('/medicalapproved',async (req,res) => {
    const {medicalid,approved} = req.body; //approved --> 1,rejection --> 0
    try {
        const medical = await Medical.findOne({medicalid,approved : false});
        if(!medical){
            throw new Error('Medical is Not Found');
        }

        if(approved){
            await Medical.updateOne({medicalid},{$set:{approved : true}});
            mailadminappoved(medical.contacts.email,medical.ownerdetails.fname,medical.ownerdetails.lname,medicalid,1);
            res.status(200).send("Successfully Approved");
        }else{
            await Medical.deleteOne({medicalid});
            mailadminappoved(medical.contacts.email,medical.ownerdetails.fname,medical.ownerdetails.lname,medicalid,0);
            res.status(200).send("Successfully DisApproved");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
})

module.exports = router;