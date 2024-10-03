const bcrypt = require('bcrypt')

async function passwordEncrypt(password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
}

async function passwordDecrypt(password, hashPassword) {
    const checkPassword = await bcrypt.compare(password, hashPassword)
    return checkPassword
}



module.exports = { passwordEncrypt, passwordDecrypt }