const jwt = require('jsonwebtoken');
const Patient = require('../models/patient');

const patientauth = async (req,res,next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ",'')
        const decoded = jwt.verify(token,process.env.SECRETKEYFORJWT)
        const patient = await Patient.findOne({_id:decoded._id,'token':token})
        if(!patient){
            throw new Error('Patient Not Found');
        }
        req.token = token;
        req.patient = patient;
        next();
    }catch(e){
        res.status(401).send({error : 'please Authenticate ...'})
    }
}
module.exports = {patientauth};