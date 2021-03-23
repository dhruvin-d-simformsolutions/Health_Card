const express = require("express");
const bodyParser = require('body-parser');
const csrf = require('csurf');
const { auth } = require("../middleware/auth");
// const {mailservice} = require('../utils/mailService');
const {mailRegistration,mailforgetpassword} = require('../utils/mailService');
const mainController = require('../controllers/common/main-controller');

const router = new express.Router();

router.post("/signup", mainController.SingUp);

router.post("/login",mainController.Login);

router.post("/logout",auth,mainController.Logout)

router.get('/getprofile',auth,mainController.GetProfile)

router.post('/forgetpassword',auth,mainController.ForgetPassword)


const multer = require('multer');
const pdf = multer({
    limits : {
        fileSize : 5000000,
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(pdf)$/)){
            return cb(new Error("Please upload a file with Extension pdf"))
        }
        cb(undefined,true);
    },
})

router.post('/uploadPDF',auth,pdf.single('pdf'),mainController.UploadPDF)

module.exports = router;