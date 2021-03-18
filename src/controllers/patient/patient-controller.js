const Patient = require("../../models/patient");

exports.Fetchpatient = async (req, res) => {
    const id = req.query.id
    try {
        const patient = await Patient.findOne({
            healthid: id
        })
        console.log(patient);
        if (!patient) {
            return res.status(404).send()
        }
        res.send(patient)
    } catch (e) {
        res.status(500).send(e.message)
    }
}
exports.updateProfile = async (req, res) => {
    // TODO : Seeking help for user update from a mentor
    try {
        // console.log(req.user);
        const user = await Patient.findByIdAndUpdate({
            _id: req.user._id
        }, {
            $set: {
                contacts: {
                    mobile: req.body.contacts.mobile || req.user.contacts.mobile,
                    email: req.body.contacts.email || req.user.contacts.email
                }
            }
        }, () => {
            console.log("Successfully Updated");
        })
        res.status(200).send("Updated Successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
}