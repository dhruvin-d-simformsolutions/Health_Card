const express = require("express");
const generator = require('generate-password');
const { auth } = require("../middleware/auth");
const MainController = require('../controllers/common/main-controller');

const router = new express.Router();

router.post("/signup",MainController.SingUp);

router.post("/login", MainController.Login);

router.post("/logout",auth,MainController.Logout)

router.get('/getprofile',auth,MainController.GetProfile)

router.post('/forgetpassword',MainController.ForgetPassword)

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

router.post('/uploadPDF',auth,pdf.single('pdf'),MainController.UploadPDF)

module.exports = router;