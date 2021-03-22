const Patient = require("../models/patient");
const Medical = require("../models/medical");
const Lab = require("../models/lab");
const Doctor = require("../models/doctor");
const {comparePassword} = require('../utils/encrypation');

exports.findByCredentials = async (username,password) => {

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
    isverify = await comparePassword(password,user.password)
    if(!isverify){
        throw new Error('Username and password does not match !!!');
    }
    return user;
}


// {
//     "changebit" : "P",
//     "details" : {
//         "fname" : "Hansa",
//         "lname" : "Dankhara",
//         "gender" : "male",
//         "dob" : "15/07/2000",
//         "aadharNumber" : 123456789013
//     },
//     "contacts" : {
//         "mobile" : 8200748635,
//         "email" : "dhruvin15720@gmail.com"
//     },
//     "emergencyContacts": {
//         "name": "Lalitbhai",
//         "mobile": 9979852034,
//         "relation": "father"
//     },
//     "address" : {
//         "addressLine1": "sdfg",
//         "addressLine2": "qwer",
//         "city": "Surat",
//         "state": "Gujarat",
//         "pincode": 394101
//     },
//     "bodyDetails" : {
//         "weight" : 50,
//         "height" : 163,
//         "alergies" : [
//             "asdfg","sdfgh","xyz"
//         ],
//         "bloodGroup" : "AB+"
//     },
//     "password" : "123456789"
// }