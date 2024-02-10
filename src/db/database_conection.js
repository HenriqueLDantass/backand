const mysql = require('mysql2');

const conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',

})
conn.getConnection((err, conn) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Conexao estabelecida com sucesso")
    }

})


module.exports = conn.promise()