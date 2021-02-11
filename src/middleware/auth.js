const jwt = require('jsonwebtoken');
const Patient = require('../models/patient');

const patientauth = async (req,res,next) => {
    try{
        const token = req.header("Authorization").replace('Bearer ','')
        // console.log(token);
        const decoded = jwt.verify(token,process.env.SECRETKEYFORJWT)
        // console.log("-----------------",decoded._id.toString(),"---------------------------");
        const patient = await Patient.findOne({_id:decoded._id,'token':token})
        // console.log(patient);
        if(!patient){
            throw new Error('Patient Not Found');
        }
        req.token = token;
        req.patient = patient;
        // console.log(req.patient);
        next();
    }catch(e){
        res.status(401).send(e.message)
    }
}
module.exports = {patientauth};