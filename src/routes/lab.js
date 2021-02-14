const express = require('express');
const Lab = require("../models/lab")
const router = new express.Router();

// router.post("/signup",async (req,res) => {
//     const lab = new Lab(req.body)
//     console.log(lab);
//     try {
//         lab.labid = "L" + lab.ownerdetails.licenseNumber;
//         await lab.save()
//         const token = await generatetokens(lab)
//     } catch (e) {
        
//     }
// })

module.exports = router; 