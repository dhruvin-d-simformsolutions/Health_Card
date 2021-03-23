const jwt = require('jsonwebtoken');

globalTokenGenerator = async function(user){

    id = user.healthid || user.labid ||user.medicalid || user.doctorid;
    // const generatedtoken = jwt.sign({ _id: user._id.toString() }, process.env.SECRETKEYFORJWT);
    const generatedtoken = jwt.sign({ _id: id.toString() }, process.env.SECRETKEYFORJWT,{ expiresIn: '1d' });
    user.token = generatedtoken;
    // console.log(user.token);
    try {
        await user.save();

    } catch (error) {
        throw new Error(error.message)
    }
    return generatedtoken
}
module.exports = {
    globalTokenGenerator,
}
