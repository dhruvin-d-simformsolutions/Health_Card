const express = require("express");
const Patient = require("../models/patient");
const router = new express.Router();
const {
  patientauth
} = require("../middleware/auth");
const {
  globaltokengenerator
} = require("../utils/generatetoken");



module.exports = router;