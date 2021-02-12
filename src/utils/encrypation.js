const bcrypt = require('bcryptjs');

const Encryptpassword = (password)=>{
    return bcrypt.hash(password, 8);
}

const Comparepassword = (password,hashpassword) => {
    return bcrypt.compare(password,hashpassword)
}

module.exports = {
    Encryptpassword,
    Comparepassword
};