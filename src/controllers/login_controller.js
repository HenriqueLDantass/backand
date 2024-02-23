const loginModels = require('../models/login_models');
const loginHelpers = require('../helpers/login_helpers');
const bcrypt = require('bcrypt');

// Controlador para registrar um novo usuário
const registerUserController = async (req, res) => {
    try {
        // Verifica se o usuário já existe
        const userExists = await loginHelpers.checkUserExiste(req.body.username);

        if (userExists) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }

        // Gera o hash da senha do usuário
        const hashedPassword = await loginHelpers.hashPassword(req.body.senha, 10);

        // Registra o usuário no banco de dados
        await loginModels.registerUser(req.body.username, hashedPassword, req.body.email);
        res.status(200).send('Usuário registrado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocorreu um erro no registro');
    }
};

// Controlador para fazer login de um usuário
const loginUserController = async (req, res) => {
    try {
        // Recupera o usuário do banco de dados usando o nome de usuário fornecido
        const user = await loginModels.LoginUser(req.body.username);

        // Verifica se o usuário foi encontrado
        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Compara a senha fornecida pelo usuário com a senha criptografada armazenada no banco de dados
        const match = await bcrypt.compare(req.body.senha, user.senha);

        if (match) {
            console.log('Login efetuado com sucesso');
            res.status(200).json({ message: 'Login efetuado com sucesso', user: user });
        } else {
            console.log('Senha incorreta');
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login' });
    }

};

module.exports = {
    registerUserController,
    loginUserController
};
