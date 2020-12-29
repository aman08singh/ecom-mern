const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    // console.log("Data is from login.js from backend", data);

    //Email checks1
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    // if(Validator.isEmpty(data.name)) {
    //     errors.name = "Name is required";
    // }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};