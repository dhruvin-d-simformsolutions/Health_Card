const express = require('express');
const router = new express.Router();

const {auth} = require('../middleware/auth.js')
const HistoryController = require('../controllers/history/history-controller');

router.post("/fetchinghistoryofpatient",auth,HistoryController.FetchingHistoryOfPatient)

router.post("/addhistoryofpatient",auth,HistoryController.AddHistoryOfPatient)

module.exports = router;