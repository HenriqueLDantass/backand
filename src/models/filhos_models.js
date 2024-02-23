const conn = require("../db/database_conection")


const insertFilho = async (nome, idade_anos, idade_meses, genero, imagePath, user_id, callback) => {
    if (!user_id) {
        throw new Error("id nao encontrado")
    }

    const novoFilho = { nome, idade_anos, idade_meses, genero, imagePath, user_id };
    const query = "INSERT INTO filhos SET ? ";
    await conn.query(query, novoFilho, callback);
}

const getFilho = async (userid) => {
    const query = "SELECT * FROM filhos WHERE user_id = ?";
    const [rows, fields] = await conn.execute(query, [userid]); // Correção aqui
    return rows;
}

const deleteFilho = async (id) => {
    const query = "DELETE FROM filhos WHERE id = ?"
    await conn.execute(query, [id])

}

const updateFilho = async (nome, idade_anos, idade_meses, genero, id_filho) => {
    if (!id_filho) {
        throw new Error("ID do filho não fornecido para atualização");
    }

    const query = "UPDATE filhos SET nome = ?, idade_anos = ?, idade_meses = ?, genero = ?  WHERE id = ?";
    const updatedFilho = await conn.execute(query, [nome, idade_anos, idade_meses, genero, id_filho]);
    return updatedFilho;
}


module.exports = {
    insertFilho,
    getFilho,
    deleteFilho,
    updateFilho
}