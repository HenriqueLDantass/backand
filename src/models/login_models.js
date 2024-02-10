//models
const conn = require('../db/database_conection')
const registerUser = async (username, password) => {
    const query = 'INSERT INTO users (username, senha) VALUES (?,?)';
    const createdUser = await conn.execute(query, [username, password]); // Adicionando await aqui
    return createdUser;
}
const LoginUser = async (username) => {
    try {
        const query = 'SELECT * FROM users WHERE username = ?';
        const [user] = await conn.execute(query, [username]);
        console.log(user[0]);

        // Se o usuário for encontrado, retorna o usuário
        // Caso contrário, retorna null
        return user.length > 0 ? user[0] : null;
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        throw error; // Lança o erro para ser tratado no controlador
    }
}



module.exports = {
    registerUser,
    LoginUser
}