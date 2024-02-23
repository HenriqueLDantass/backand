//models
const conn = require('../db/database_conection')
const registerUser = async (username, password, email) => {
    const query = 'INSERT INTO users (username, senha , email) VALUES (?,?,?)';
    const createdUser = await conn.execute(query, [username, password, email]); // Adicionando await aqui
    return createdUser;
}
const LoginUser = async (username) => {
    try {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [user] = await conn.execute(query, [username]);
        console.log(user[0]);
        return user.length > 0 ? user[0] : null;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw error;
    }
}



module.exports = {
    registerUser,
    LoginUser
}