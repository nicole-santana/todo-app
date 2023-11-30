const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))


//converter dados do formulário em objeto javascript
app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//rotas

app.post('/criar', (requisicao, resposta) => {
    const descricao = requisicao.body.descricao
    const completa = 0

    const sql = `
        INSERT INTO tarefas(descricao, completa)
        VALUES ('${descricao}', '${completa}')
    `

    conexao.query(sql, (erro) => {
        if (erro) {
            return console.log(erro)
        }

        resposta.redirect('/')
    })
})

app.get('/', (requisicao, resposta) => {
    const sql = 'SELECT * FROM tarefas'

    conexao.query(sql, (erro, dados) => {
        if (erro) {
            return console.log(erro)
        }

        console.log(dados)

        const tarefas = dados.map((dado) => {
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: dado.completa === 0 ? false : true
                //NÃO TÁ TRANSFORMANDO O 0 EM FALSE
            }
        })

        resposta.render('home', { tarefas })
    })
})

const conexao = mysql.createConnection ({
    host: "localhost",
    user: "root",
    // MUDAR O PASSWORD NO LABORATÓRIO PARA ROOT
    password: "58240540",
    database: "todoapp",
    port: 3306
})

conexao.connect((erro) => {
    if (erro) {
        return console.log(erro)
    }

    console.log("Estou conectado ao MySQL.")

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000!")
    })
})