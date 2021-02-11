const jwt = require('jsonwebtoken');

globaltokengenerator = async function(user){

    id = user.healthid || user.labid ||user.medicalid || user.doctorid;
    // const generatedtoken = jwt.sign({ _id: user._id.toString() }, process.env.SECRETKEYFORJWT);
    const generatedtoken = jwt.sign({ _id: id.toString() }, process.env.SECRETKEYFORJWT);
    user.token = generatedtoken;
    console.log(user.token);
    await user.save();
    return generatedtoken
}

module.exports = {
    globaltokengenerator,
}
