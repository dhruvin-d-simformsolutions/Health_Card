const express = require("express");
const generator = require('generate-password');
const bcrypt = require('bcryptjs');
const sgMail = require('@sendgrid/mail')
const Patient = require("../models/patient");
const Medical = require("../models/medical");
const Lab = require("../models/lab");
const Doctor = require("../models/doctor");
const { auth } = require("../middleware/auth");
const { findByCredentials } = require("../utils/findByCredentials");
const { globaltokengenerator } = require("../utils/generatetoken");
const {Encryptpassword} = require("../utils/encrypation");

const router = new express.Router();


router.post("/signup", async (req, res) => {
  // const patient = new Patient(req.body)
  // console.log(user);
  try {
    const first = req.body.changebit[0]; //TODO:P,D,L,M
    let user;
    switch (first) {
      case "P":
        user = new Patient(req.body);
        user.healthid = "P" + user.details.aadharNumber;
        break;
      case "D":
        user = new Doctor(req.body);
        user.doctorid = "D" + user.details.licenseNumber;
        break;
      case "L":
        user = new Lab(req.body);
        user.labid = "L" + user.ownerdetails.licenseNumber;
        break;
      case "M":
        user = new Medical(req.body);
        user.medicalid = "M" + user.ownerdetails.licenseNumber;
        break;
      default:
        throw new Error("Invalid UserName !!!");
    }
    const token = await globaltokengenerator(user);
    res.status(201).send({
      user,
      token,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await findByCredentials(req.body.username, req.body.password);
    // const patient = await Patient.findByCredentials(req.body.healthid,req.body.password);
    const token = await globaltokengenerator(user);
    // console.log({user,token});
    res.status(200).send({
      user,
      token,
    });
  } catch (err) {
    res.send(err.message);
  }
});

router.post("/logout",auth,async (req,res)=>{
  try {
    req.user.token = undefined
    await req.user.save();
    res.send("Logout Successful")
    
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.get('/getprofile',auth,async (req,res)=>{
  try{
    res.send(req.user);
  }catch(err){
    res.status(400).send(err.meassage);
  }
})


router.post('/forgetpassword',async (req,res) => {
  try {
    const {id} = req.body
    // console.log(email,role[0]);
    let userObject;
    switch (id[0]) {
      case "P":
        // userObject = await Patient.findOne({ "contacts.email" : email })
        userObject = await Patient.findOne({ healthid: id })
        break;
      case "D":
        userObject = await Doctor.findOne({ doctorid: id })
        break;
      case "L":
        userObject = await Lab.findOne({ labid :id })
        // console.log(userObject);
        break;
      case "M":
        userObject = await Medical.findOne({ medicalid: id })
        break;
      default:
        throw new Error("Invalid UserName !!!");
    }
    
    if(!userObject){
      throw new Error("Email Dose Not Found!!!")
    }
    // $2a$08$c1NYXIo3U.C/MPPmjVkkheiXeMKq/mCwGCjhlsIVKmdj2h6ErVlwi = 123456789
    
    const temporaryPassword = generator.generate({
      length: 10,
      numbers: true,
      lowercase:true,
      uppercase:true,
    });
    //TODO : Sending Email to User with temporary password
    
    userObject.password = await Encryptpassword(temporaryPassword);
    // console.log(temporaryPassword,userObject.password);
    await mailsent();
    await userObject.save()
    res.send(userObject)
   
  } catch (e) {
    res.status(500).send(e.message)
  }
})




// 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
// echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env


// const mailsent =  () =>{
//   // try{
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//     const msg = {
//       to: 'dhruvin15720@gmail.com', // Change to your recipient
//       from: 'vbs1765@gmail.com', // Change to your verified sender
//       subject: 'Sending with SendGrid is Fun',
//       text: 'and easy to do anywhere, even with Node.js',
//       html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//     }
//     sgMail
//       .send(msg)
//       .then(() => {
//         console.log('Email sent')
//       })
//       .catch((error) => {
//         console.error(error)
//       })
// }




module.exports = router;
// Cannot read property '0' of undefined