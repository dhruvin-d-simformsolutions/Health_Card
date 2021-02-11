const express = require('express');
const router = new express.Router();

router.post('/login',async (req,res)=>{
    try{
        const user = await findByCredentials(req.body.username,req.body.password);
        // const patient = await Patient.findByCredentials(req.body.healthid,req.body.password);
        const token = await globaltokengenerator(user);
        console.log({user,token});
        res.status(200).send({user,token});
    }catch(err){
        res.send(err.message);
    }
})

module.exports = router;