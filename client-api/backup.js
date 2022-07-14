const express = require('express'); // coloco a dependência do express
const fs = require('fs')

const app = express(); // instancio o express para poder usar

const data = require("./data.json") // aqui chamo o arquivo com meus dados
app.use(express.json())

const endpoint = "/clients"

// função auxiliar. Problema: não ficou interessante para o put já que  alteraria o id do cliente
const writeOnFile = ({ name, mail, gender }) => {
    // salvar no arquivo data.json
    let clientsjson = fs.readFileSync("data.json","utf-8")
    let clients = JSON.parse(clientsjson)
    clients.push({
        id: clients[clients.length - 1].id + 1,
        name,
        mail,
        gender
    })
    clientsjson = JSON.stringify(clients)
    fs.writeFileSync("data.json", clientsjson)


}


app.get(endpoint, (req, res) => { 
    res.json(data) // exibe a variável data na interface do insominia
});

// get para pegar um cliente só
app.get(endpoint + '/:id', (req, res) => { 
    const { id } = req.params // pega as informações que estão na url da requisição (parâmetros)
    const client = data.find(cli => cli.id == id)

    if (!client) return res.status(404).json() // 404 é o código de que não foi achado conteúdo (404 seira se a rota não existisse, a rota existe, mas o conteúdo não)
    
    res.json(client)
});

app.post(endpoint, (req, res) => {
    // pego as informações na req do body
    const { name, mail, gender } = req.body

    writeOnFile({
        name,
        mail,
        gender
    })
    
    res.json(data) // DÚVIDA: aqui não devolve o arquivo atualizado
})

app.put(endpoint + '/:id', (req, res) => {
    const { id } = req.params

    let clientsjson = fs.readFileSync("data.json","utf-8")
    let clients = JSON.parse(clientsjson)
    const client = clients.find(cli => cli.id == id) // guardo qual cliente quero atualizar

    if (!client) return res.status(404).json() // cliente não cadastrado

    const { name, mail, gender } = req.body // no body tem as informações do cliente novo que quero salvar
    client.name = name // atualiza as informações do cliente com o id que achei 
    client.mail = mail // aualiza o e-mail
    client.gender = gender // atualiza gênero

    clientsjson = JSON.stringify(clients)
    fs.writeFileSync("data.json", clientsjson)

    res.json(data)

})

app.delete(endpoint + '/:id', (req, res) => {
    const { id } = req.params

    let clientsjson = fs.readFileSync("data.json","utf-8")
    let clients = JSON.parse(clientsjson)

    const clientsFiltered = clients.filter(cli => cli.id != id) // guardo qual cliente quero deletar

    clientsjson = JSON.stringify(clientsFiltered) // mando para o arquivo a lista filtrada
    fs.writeFileSync("data.json", clientsjson)

    res.json(data)

})

app.listen(3000, function() {
    console.log("server is running");
})