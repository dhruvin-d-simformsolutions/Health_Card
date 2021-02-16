const nodemailer = require('nodemailer');
const {registrationmsg} = require('./templates/emailRegistration')
const {forgetpassmsg} = require('./templates/emailForgetPassword');
const {emailapproved,emailrejected} = require('./templates/emailApproveByAdmin');

//mailRegistration
const mailRegistration = (usermail,usertype,firstname,lastname,username) =>{
    const extramsg =  (usertype == "Patient")?'YOUR ACCOUNT IS NOW ACTIVE':'Your account deatails go for verification process. Shortly you will receive mail regarding to verification';
    const message = registrationmsg(firstname,lastname,username,extramsg)
    mailservice(usermail,message);
}

//forget password
const mailforgetpassword = (usermail,firstname,lastname,username,password) =>{
    const messsage = forgetpassmsg(firstname,lastname,username,password);
    mailservice(usermail,messsage);
}

//create admin approve message
const mailadminappoved = (usermail,firstname,lastname,username,isapproved)=>{
    let message;
    if(isapproved){
        message =  emailapproved(firstname,lastname,username);
    }else{
        message =  emailrejected(firstname,lastname,username);
    }
    mailservice(usermail,message);
}


const mailservice = (usermail,message) => {
    

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });

    var mailOptions = {
            from: 'sgh000437@gmail.com',
            to: usermail,
            html:message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });

}

module.exports = {
    mailadminappoved,
    mailforgetpassword,
    mailRegistration
}


//Test
// mailservice('vbs1765@gmail.com',"Patient",'Vaibhav','Shiroya','P6778293');
// mailservice('vbs1765@gmail.com',"Doctor",'Vaibhav','Shiroya','D6778293');
// mailservice('vbs1765@gmail.com',"Patient",'Vaibhav','Shiroya','P6778293','2638946');

//parameter:{
    // usermail : email,
    // usertype : "Patient||Doctor||Lab||Medical",
    // firstname,
    // lastname,
    // username : "healthid" || "doctorid" || "labid" || "medicalid"
    // password (?) : 
// }





// const sgMail = require('@sendgrid/mail')
// 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
// echo "export SENDGRID_API_KEY='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'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env