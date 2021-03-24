const Patient = require("../models/patient");
const GeneralMedicalAndLab = require("../models/orgnization")
const {
    comparePassword
} = require('../utils/encrypation');

exports.findByCredentials = async (username, password) => {

    const first = username[0];
    let user;
    // user = await Doctor.findOne({uniqueid:username});
    switch (first) {
        case "P":
            user = await Patient.findOne({
                uniqueid: username
            }, {
                uniqueid: 1,
                password: 1,
            });
            break;
        case "D":
        case "M":
        case "L":
            user = await GeneralMedicalAndLab.findOne({
                uniqueid: username
            },{
                uniqueid : 1,
                password : 1,
                approved : 1
            });
            break;
        default:
            throw new Error("Invalid UserName !!!");
    }
    console.log(user.approved);
    if (!user) {
        throw new Error("User is not Register yet");
    }
    if (first != "P" && user.approved === false) {
        throw new Error("User is not Approved !!!")
    }
    isverify = await comparePassword(password, user.password)
    if (!isverify) {
        throw new Error('Incorrect Password !!!');
    }
    console.log(user);
    return user;
}