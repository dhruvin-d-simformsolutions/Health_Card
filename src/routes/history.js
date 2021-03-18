const express = require('express');
const router = new express.Router();

const {auth} = require('../middleware/auth.js')
const {isDoctor} = require('../middleware/ACL.js')
const HistoryController = require('../controllers/history/history-controller');

router.post("/fetchinghistoryofpatient", auth,isDoctor,HistoryController.FetchingHistoryOfPatient)

router.post("/addhistoryofpatient",auth,isDoctor,HistoryController.AddHistoryOfPatient)

module.exports = router;