const jwt = require('jsonwebtoken');
globalTokenGenerator = async function(user){
    id = user.uniqueid;
    const generatedtoken = jwt.sign({ _id: id.toString() }, process.env.SECRETKEYFORJWT,{ expiresIn: '1d' });
    user.token = generatedtoken;
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
