const bcrypt = require('bcryptjs');

const encryptPassword = (password)=>{
    return bcrypt.hash(password, 8);
}

const comparePassword = (password,hashpassword) => {
    return bcrypt.compare(password,hashpassword)
}

module.exports = {
    encryptPassword,
    comparePassword
};