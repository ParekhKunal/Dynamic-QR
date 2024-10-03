const validator = require('validator')
const bcrypt = require('bcrypt')

const dbConn = require('../db/index.js')
const { passwordEncrypt, passwordDecrypt } = require('../utilities/passwordEncryptDecrypt.js')


function userRouteCheck(req, res) {
    return res.send({ "status": "success", "message": "User Router and Controller check" })
}

async function userRegister(req, res) {

    const { firstName, lastName, email, password } = req.body;

    try {
        const hashedPassword = await passwordEncrypt(password)

        const insertQuery = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';

        const [result] = await dbConn.execute(insertQuery, [firstName, lastName, email, hashedPassword]);

        return res.status(201).json({ "status": "success", "user": `User Register Successfully with userId: ${result.insertId}` })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to register user" });
    }
}

async function userLogin(req, res) {

    const { email, password } = req.body;

    try {
        const fetchQuery = 'SELECT id, firstName, email, password FROM users where email = ?';

        const [user] = await dbConn.execute(fetchQuery, [email]);

        const checkPassword = await passwordDecrypt(password, user[0].password)

        if (!checkPassword) {
            return res.status(500).json({ "status": "fail", "message": `Password Not Matched` })
        }

        return res.status(200).json({ "status": "success", "message": `User Login Successfully` })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to register user" });
    }
}

module.exports = { userRouteCheck, userRegister, userLogin }
