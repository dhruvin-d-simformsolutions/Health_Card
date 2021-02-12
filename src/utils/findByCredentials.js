const Patient = require("../models/patient");
const Medical = require("../models/medical");
const Lab = require("../models/lab");
const Doctor = require("../models/doctor");
const bcrypt = require('bcryptjs');

findByCredentials = async (username,password) => {

    const first = username[0];
    let user;
    switch(first){
        case "P": user = await Patient.findOne({healthid : username});
            break;
        case "D": user = await Doctor.findOne({doctorid:username});
            break;
        case "L": user = await Lab.findOne({labid:username});
            break;
        case "M": user = await Medical.findOne({medicalid:username});
            break;
        default:
            throw new Error("Invalid UserName !!!");
    }

    // const patient = await Patient.findOne({healthid});
    if(!user){
        throw new Error("User is not Available");
    }
    if(first != "P" && user.approved === false){
        throw new Error("User is not Approved !!!")
    }
    isverify = await bcrypt.compare(password,user.password)
    if(!isverify){
        throw new Error('Username and password does not match !!!');
    }
    return user;
}

module.exports = {
    findByCredentials,
}