const express = require('express');

const adminControllers = require('../controllers/admin/admin-controller');
const router = new express.Router();

//Fetching Pending Doctors, Medicals ans Labs
router.get('/pendingdoctors',adminControllers.PendingDoctors)

router.get('/pendinglabs',adminControllers.PendingLabs)

router.get('/pendingMedicals',adminControllers.PendingDoctors)

//Either Approving or Rejection
router.patch('/doctorapproved',adminControllers.DoctorApproved)

router.patch('/labapproved',adminControllers.LabApproved)

router.patch('/medicalapproved',adminControllers.MedicalApproved)

module.exports = router;