const Doctor = require('../../models/doctor');
const GeneralMedicalAndLab = require("../../models/orgnization");
const { mailadminappoved } = require('../../utils/mailService');

exports.PendingDoctors = async (req,res)=>{
    try {
        const PendingDoctors = await Doctor.find({approved:false,userRole : "Doctor"}).select(["uniqueid","details.fname","details.lname"])
        console.log(PendingDoctors);
        res.status(200).send(PendingDoctors);
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}

exports.PendingOrgnization = async (req, res) => {
    try {
        const PendingOrgnization = await GeneralMedicalAndLab.find({ approved: false , userRole : ["Medical","Lab"]}).select(["uniqueid","OrgnizationType"]);
        console.log(PendingOrgnization);
        res.status(200).send(PendingOrgnization);
        
    } catch (err) {
        res.status(500).send(err.message)
    }
}

//TODO : sent mail according to tx.
exports.DoctorApproved = async (req,res) => {

    const {uniqueid,approved} = req.body; //approved --> 1,rejection --> 0
    try {
        
        const doctor = await Doctor.findOne({uniqueid,approved:false});
        if(!doctor){
            throw new Error("Doctor Not Found")
        }

        if(approved){
            await Doctor.updateOne({uniqueid},{$set:{approved : true}});
            mailadminappoved(doctor.details.contacts.email,doctor.details.fname,doctor.details.lname,uniqueid,1);
            res.status(200).send("Successfully Approved");
        }else{
            await Doctor.deleteOne({uniqueid});
            mailadminappoved(doctor.details.contacts.email,doctor.details.fname,doctor.details.lname,uniqueid,0);
            res.status(200).send("Successfully DisApproved");
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
}

// exports.LabApproved = async (req,res) => {
//     const {labid,approved} = req.body; //approved --> 1,rejection --> 0
//     const lab = await Lab.findOne({labid,approved:false})
//     if(!lab){
//         throw new Error('Lab Not Found');
//     }
//     try {
//         if(approved){
//             await Lab.updateOne({labid},{$set:{approved : true}});
//             mailadminappoved(lab.contacts.email,lab.ownerdetails.fname,lab.ownerdetails.lname,labid,1);
//             res.status(200).send("Successfully Approved");
//         }else{
//             await Lab.deleteOne({labid});
//             res.status(200).send("Successfully DisApproved");
//             mailadminappoved(lab.contacts.email,lab.ownerdetails.fname,lab.ownerdetails.lname,labid,0);
//         }
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// }

// exports.MedicalApproved = async (req,res) => {
//     const {medicalid,approved} = req.body; //approved --> 1,rejection --> 0
//     try {
//         const medical = await Medical.findOne({medicalid,approved : false});
//         if(!medical){
//             throw new Error('Medical is Not Found');
//         }

//         if(approved){
//             await Medical.updateOne({medicalid},{$set:{approved : true}});
//             mailadminappoved(medical.contacts.email,medical.ownerdetails.fname,medical.ownerdetails.lname,medicalid,1);
//             res.status(200).send("Successfully Approved");
//         }else{
//             await Medical.deleteOne({medicalid});
//             mailadminappoved(medical.contacts.email,medical.ownerdetails.fname,medical.ownerdetails.lname,medicalid,0);
//             res.status(200).send("Successfully DisApproved");
//         }
//     } catch (e) {
//         res.status(500).send(e.message);
//     }
// }

exports.orgnizationApproved = async (req,res) => {
    const {uniqueid,approved} = req.body; //approved --> 1,rejection --> 0
    const orgnization = await GeneralMedicalAndLab.findOne({uniqueid,approved:false})
    try {
        if(!orgnization){
            throw new Error('Orgnization Not Found');
        }
        if(approved){
            await GeneralMedicalAndLab.updateOne({uniqueid},{$set:{approved : true}});
            mailadminappoved(orgnization.ownerdetails.contacts.email,orgnization.ownerdetails.fname,orgnization.ownerdetails.lname,uniqueid,1);
            res.status(200).send("Successfully Approved");
        }else{
            await GeneralMedicalAndLab.deleteOne({uniqueid});
            res.status(200).send("Successfully DisApproved");
            mailadminappoved(orgnization.ownerdetails.contacts.email,orgnization.ownerdetails.fname,orgnization.ownerdetails.lname,uniqueid,0);
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
}
