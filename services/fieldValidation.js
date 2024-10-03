const validator = require('validator')
const bcrypt = require('bcrypt')

async function userRegistrationValidation(req, res, next) {

    const { firstName, lastName, email, password, rePassword } = req.body

    let missingFields = [];
    if (!email) missingFields.push("Email");
    if (!firstName) missingFields.push("First Name");
    if (!lastName) missingFields.push("Last Name");
    if (!password) missingFields.push("Password");
    if (!rePassword) missingFields.push("Re-entered Password");

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `${missingFields.join(', ')} ${missingFields.length > 1 ? 'are' : 'is'} mandatory` });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Email is not Valid" })
    }

    if (password.length < 6) {
        return res.status(400).json({ error: "Password Must be of 6 or more characters" })
    }

    if (password !== rePassword) {
        return res.status(400).json({ error: "Password and Re-Enter Password not matched" })
    }


    next();

}

async function userLoginValidation(req, res, next) {

    const { email, password } = req.body

    let missingFields = [];
    if (!email) missingFields.push("Email");
    if (!password) missingFields.push("Password");

    if (missingFields.length > 0) {
        return res.status(400).json({ error: `${missingFields.join(', ')} ${missingFields.length > 1 ? 'are' : 'is'} mandatory` });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Email is not Valid" })
    }

    if (password.length < 6) {
        return res.status(400).json({ error: "Password Must be of 6 or more characters" })
    }

    next();
}

module.exports = { userRegistrationValidation, userLoginValidation }