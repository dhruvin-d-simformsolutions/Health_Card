const {History} = require('../../models/history');
const Patient = require('../../models/patient');

exports.FetchingHistoryOfPatient = async (req, res) =>{
    const uniqueid = req.body.uniqueid
    console.log(uniqueid);
    try {
        if(uniqueid[0] === 'P')
        {
            const historyObject = await History.findOne({uniqueid})
            console.log(historyObject);
            if(!historyObject){
                throw new Error("History Not found");
            }
            res.send(historyObject)
        }
        else{
            throw new Error("Please Enter Valid Patient ID")
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}


exports.AddHistoryOfPatient = async (req, res) =>{
    try {
        if(uniqueid[0] === 'P'){
        
            // console.log(req.user);
            const uniqueid = req.body.uniqueid;
            const isexist = await Patient.findOne({uniqueid});
            if(!isexist){
                throw new Error("Patient is not Available");
            }
    
            let oldhistory =await  History.findOne({uniqueid});
            if(!oldhistory){
                oldhistory= new History({uniqueid})
            }
            req.body.history.uniqueid = req.user.uniqueid
            oldhistory.history.push(req.body.history);
            await oldhistory.save();
            console.log(oldhistory)
            res.status(200).send("History is Successfully added")
        }
        else{
            throw new Error("Please Enter Valid Patient ID")
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}