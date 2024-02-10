const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

//chave jwt
const JWT_SECRET = "b91028378997c0b3581821456edefd0ec7958f953f8c1a6dd856e2de27f0d7e0fb1a01cda20d1a6890267e629f0ff5dc7ee46bce382aba62d13989614417606a"

const geradorToken = (user) => {
    return jwt.sign({ userid: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' })
}
const comparePasword = async (password, hashpassword) => {
    return bcrypt.compare(password, hashpassword);
}

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

module.exports = {
    geradorToken,
    comparePasword,
    hashPassword
}



//