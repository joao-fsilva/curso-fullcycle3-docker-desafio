const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'fc_docker_desafio',
    charset: 'utf8'
}

const mysql = require('mysql')
const connection = mysql.createConnection(config)

app.get('/', (req, res) => {
    const nome = "Meu nome";
    const timestamp = new Date().getTime();

    const nomeComTimestamp = nome.concat("-", timestamp);

    const sql = `INSERT INTO people(name) VALUES(?);`

    connection.query(sql, nomeComTimestamp)

    const sqlPeoples = 'SELECT id, name FROM people';

    connection.query(sqlPeoples, (err, results) => {
        if (err) {
            console.error('Erro:', err);
            return;
        }

        let ul = '<ul>'

        results.forEach(res => ul += `<li>${res.id} - ${res.name}</li>`);

        ul += '</ul>'

        res.send(`<h1>Full Cycle Rocks!</h1><br> ${ul}`)
    });
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
