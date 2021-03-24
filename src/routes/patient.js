const express = require("express");
const router = new express.Router();

const PaientController = require('../controllers/patient/patient-controller');
const {isPatient} = require('../middleware/ACL')
const { auth } = require("../middleware/auth");

router.get('/FetchPatient',auth,isPatient,PaientController.Fetchpatient)

router.patch('/updateprofile',auth,isPatient,PaientController.updateProfile)

module.exports = router;