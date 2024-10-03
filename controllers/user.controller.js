
const dbConn = require('../db/index.js')

const sendMail = require('../services/mailSend.js')

const { passwordEncrypt, passwordDecrypt } = require('../utilities/passwordEncryptDecrypt.js')


function userRouteCheck(req, res) {
    return res.send({ "status": "success", "message": "User Router and Controller check" })
}

async function userRegister(req, res) {

    const { firstName, lastName, email, password } = req.body;

    try {
        //Encrypt the password
        const hashedPassword = await passwordEncrypt(password)

        //Insert Into Database
        const insertQuery = 'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
        const [result] = await dbConn.execute(insertQuery, [firstName, lastName, email, hashedPassword]);

        //Check if the user was inserted successfully
        if (result.affectedRows > 0) {

            //Send registration email to the user
            const mailOptions = {
                to: email,
                subject: "Registration",
                html: `Hello ${firstName} ${lastName},<br><br><b>Thanks For Registration</b><br><br>Best Regards,<br>The Team`
            };

            const mailResult = await sendMail(mailOptions);

            if (mailResult.success) {
                return res.status(201).json({
                    "status": "success",
                    "message": `User registered successfully with userId: ${result.insertId}, email sent successfully.`
                });
            } else {
                // If mail sending failed, you might want to delete the created user or handle it differently
                return res.status(500).json({
                    "status": "failure",
                    "message": "User registered, but failed to send email."
                });
            }
        } else {
            return res.status(500).json({
                "status": "failure",
                "message": "Failed to register user."
            });
        }
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
