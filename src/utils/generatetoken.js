const jwt = require('jsonwebtoken');

globaltokengenerator = async function(user){
    // const user = this;
    const generatedtoken = jwt.sign({ _id: user._id.toString() }, process.env.SECRETKEYFORJWT);
    user.token = generatedtoken;
    await user.save();
    return generatedtoken
}

module.exports = {
    globaltokengenerator,
}