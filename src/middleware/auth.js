const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");
const Medical = require("../models/medical");
const Lab = require("../models/lab");
const Doctor = require("../models/doctor");

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        // console.log(token);
        const decoded = jwt.verify(token, process.env.SECRETKEYFORJWT);
        // console.log(
        //     "-----------------",
        //     decoded._id,
        //     "---------------------------"
        // );
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
        if (!user) {
            throw new Error("User Not Found");
        }
        if(first != "P" && user.approved === false){
            throw new Error("User is not Approved !!!")
        }
        req.identity = first
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send(e.message);
    }
};

module.exports = {
    auth,
};
