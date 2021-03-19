const bcrypt = require('bcryptjs');

exports.encryptPassword = (password)=>{
    return bcrypt.hash(password, 8);
}

exports.comparePassword = (password,hashpassword) => {
    return bcrypt.compare(password,hashpassword)
}

// module.exports = {
//     encryptPassword,
//     comparePassword
// };