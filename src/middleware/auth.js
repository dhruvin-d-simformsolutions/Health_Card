const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");
const Medical = require("../models/medical");
const Lab = require("../models/lab");
const Doctor = require("../models/doctor");

// const patientauth = async (req, res, next) => {
//     try {
//         const token = req.header("Authorization").replace("Bearer ", "");
//         // console.log(token);
//         const decoded = jwt.verify(token, process.env.SECRETKEYFORJWT);
//         console.log(
//             "-----------------",
//             decoded._id.toString(),
//             "---------------------------"
//         );
//         const patient = await Patient.findOne({
//             healthid: decoded._id,
//             token: token,
//         });
//         // console.log(patient);
//         if (!patient) {
//             throw new Error("Patient Not Found");
//         }
//         req.token = token;
//         req.patient = patient;
//         // console.log(req.patient);
//         next();
//     } catch (e) {
//         res.status(401).send(e.message);
//     }
// };

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        // console.log(token);
        const decoded = jwt.verify(token, process.env.SECRETKEYFORJWT);
        console.log(
            "-----------------",
            decoded._id,
            "---------------------------"
        );
        let first = decoded._id[0];
        let user;
        switch (first) {
            case "P":
                user = await Patient.findOne({
                    healthid: decoded._id,
                    token: token,
                });
                break;
            case "D":
                user = await Doctor.findOne({
                    doctorid: decoded._id,
                    token: token,
                });
                break;
            case "L":
                user = await Lab.findOne({
                    labid: decoded._id,
                    token: token,
                });
                break;
            case "M":
                user = await Medical.findOne({
                    medicalid: decoded._id,
                    token: token,
                });
                break;
            default:
                throw new Error("Invalid UserName !!!");
        }

        // const user = await Patient.findOne({
        //     _id: decoded._id,
        //     'token': token
        // })
        // console.log(patient);
        if (!user) {
            throw new Error("User Not Found");
        }
        if(first != "P" && user.approved === false){
            throw new Error("User is not Approved !!!")
        }
        req.token = token;
        req.user = user;
        // console.log(req.patient);
        next();
    } catch (e) {
        res.status(401).send(e.message);
    }
};

module.exports = {
    auth,
};
