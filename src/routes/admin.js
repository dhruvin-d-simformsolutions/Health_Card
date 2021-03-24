const express = require('express');

const adminControllers = require('../controllers/admin/admin-controller');
const router = new express.Router();

//Fetching Pending Doctors, Medicals ans Labs
router.get('/pendingdoctors',adminControllers.PendingDoctors)

router.get('/pendingOrgnizations',adminControllers.PendingOrgnization)

//Either Approving or Rejection
router.patch('/doctorapproved',adminControllers.DoctorApproved)

router.patch('/orgnizationapproved',adminControllers.orgnizationApproved)

module.exports = router;