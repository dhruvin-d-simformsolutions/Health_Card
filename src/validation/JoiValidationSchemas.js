const joi = require('@hapi/joi');

//TODO : Making remaining JOI validation Schema 
const loginSchema = joi.object({
    username: joi.string().required().min(13),
    password : joi.string().required()
})

const signUpSchema = joi.object({
    changebit: joi.string().min(1),
    details: joi.object({
        fname: joi.string().required(),
        lname: joi.string().required(),
        gender: joi.string().required(),
        dob: joi.date().required(),
        aadharNumber: joi.number().min(12).required()
    }),
    contacts: joi.object({
        mobile: joi.number().min(10).required(),
        email: joi.string().email().required(),
    }),
    emergencyContacts: joi.object({
        name: joi.string().required(),
        mobile: joi.number().required(),
        relation: joi.string().required()
    }),
    address: joi.object({
        addressLine1: joi.string().required(),
        addressLine2: joi.string().required(),
        city: joi.string().required(),
        state: joi.string().required(),
        pincode: joi.number().min(6).required()
    }),
    bodyDetails: joi.object({
        weight: joi.number().required(),
        height: joi.number().required(),
        alergies: joi.array().required(),
        bloodGroup: joi.string()
    }),
    password: joi.string().min(6).max(20).required(),
})


module.exports = {
    loginSchema,
    signUpSchema
};
