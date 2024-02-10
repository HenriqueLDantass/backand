const loginModels = require('../models/login_models')
const loginHelps = require("../helpers/login_helpers")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//controller
const registerUserController = async (req, res) => {
    try {
        const hashedPassword = await loginHelps.hashPassword(req.body.senha, 10);

        const registerUser = await loginModels.registerUser(req.body.username, hashedPassword);
        res.status(200).send('Usuário registrado com sucesso');
    } catch (e) {
        console.error(e);
        res.status(500).send("Ocorreu um erro no registro");
    }
};

const loginUserController = async (req, res) => {
    try {
        // Recupera o usuário do banco de dados usando o nome de usuário fornecido
        const user = await loginModels.LoginUser(req.body.username);

        // Verifica se o usuário foi encontrado
        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(401).json({ message: "Credenciais inválidas" });
        }

        // Compara a senha fornecida pelo usuário com a senha criptografada armazenada no banco de dados
        const match = await bcrypt.compare(req.body.senha, user.senha);

        if (match) {
            // Se as senhas coincidirem, gera um token JWT para o usuário autenticado
            const accessToken = await jwt.sign({ username: user.username, userId: user.user_id }, 'd8ba0efa43387f64c8ad374245911107c21ac41b21a7e45f95a4411baebd64be', { expiresIn: '1h' });
            console.log('Token gerado:', accessToken);
            res.json({ accessToken: accessToken });
        } else {
            console.log('Senha incorreta');
            res.status(401).json({ message: "Credenciais inválidas" });
        }
    } catch (e) {
        console.error('Erro ao fazer login:', e);
        res.status(500).json({ message: "Erro ao fazer login" });
    }
}







module.exports = {
    registerUserController,
    loginUserController
}