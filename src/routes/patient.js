const express = require("express");
const router = new express.Router();

const PaientController = require('../controllers/patient/patient-controller');
const { auth } = require("../middleware/auth");

router.get('/FetchPatient',auth,PaientController.Fetchpatient)

router.patch('/updateprofile',auth,PaientController.updateProfile)

module.exports = router;