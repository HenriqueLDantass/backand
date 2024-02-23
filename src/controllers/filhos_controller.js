const filhosModel = require("../models/filhos_models")

const insertFilho = async (req, res) => {
    try {
        const usuarioId = req.params.id;
        console.log("id usuario url: " + usuarioId)

        const { nome, idade_anos, idade_meses, genero, imagePath } = req.body;
        const novoFilho = { nome, idade_anos, idade_meses, genero, imagePath, user_id: usuarioId };
        await filhosModel.insertFilho(nome, idade_anos, idade_meses, genero, imagePath, usuarioId);
        res.status(201).json({ message: 'Filho cadastrado com sucesso' });

    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Erro ao cadastrar filho' });
    }



}

const getFilho = async (req, res) => {
    try {
        const id = req.params.id;
        const filhos = await filhosModel.getFilho(id); // Correção aqui
        res.status(200).json(filhos); // Retornando os filhos
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Erro ao resgatar dados dos filhos' });
    }
}

const deleteFilho = async (req, res) => {
    try {
        const idfilho = req.params.id
        await filhosModel.deleteFilho(idfilho);
        res.status(204).json({ message: `Filho deletador com sucesso` })


    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Erro ao deletar dados dos filhos' });
    }

}
const updateFilho = async (req, res) => {
    try {
        const id = req.params.id;
        const idfilho = req.params.idfilho;

        console.log('ID do usuário:', id);
        console.log('ID do filho:', idfilho);

        const { nome, idade_anos, idade_meses, genero } = req.body;

        console.log('Dados recebidos no corpo da requisição:', req.body);

        const filho = await filhosModel.updateFilho(nome, idade_anos, idade_meses, genero, idfilho);

        res.status(204).json({ filho });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Erro ao atualizar dados dos filhos' });
    }

}
module.exports = {
    insertFilho,
    getFilho,
    deleteFilho,
    updateFilho
}