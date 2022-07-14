const express = require('express'); // coloco a dependência do express
const app = express(); // instancio o express para poder usar

const data = require("./data.json") // aqui chamo o arquivo, mas na aplicação possivelmente vai ser a comunicação com o banco de dados

app.use(express.json()) // "express usa para mim a expressão json" estou avisando para o express que quero usar json

const endpoint = "/clients"

// os verbos do http (get, post, put e delete) já estão no express para fácil uso, só usar o app.get...

// esse métodos (app.get, app.post...) são app.get(endpoint, callback function que vai processar a requisição)
app.get(endpoint, function(req, res) { 
    res.json(data) // exibe a variável data na interface do insominia
});

app.get(endpoint + '/:id', function(req, res) {
    const { id } = req.params // pega as informações que estão na url da requisição (parâmetros)
    const client = data.find(cli => cli.id == id)

    // fazendo tratamento de erro, já que o padrão é sempre responder 200 ok mesmo que um cliente não exista 
    // é uma boa prática fazer esse tratamento

    if (!client) return res.status(204).json() // 204 é o código de que não foi achado conteúdo (404 seira se a rota não existisse, a rota existe, mas o conteúdo não)
    
    res.json(client) // é a minha resposta (que vai ser exibida na interface do insominia)
});

// para salvar um cliente
app.post(endpoint, function(req, res) {
    const { name, email } = req.body; // pego as informações que estão no body da requisição (aquilo que coloquei lá no insominia)

    // aqui faciaria a lógica para salvar o novo cliente, por exemplo escrever no arquivo

    res.json({ name, email });
    // a rota é a mesma que o get, por exemplo, o que muda é o verbo
});

// atualizar um cliente
app.put(endpoint + '/:id', function(req, res) {
    const { id } = req.params;
    const client = data.find(cli => cli.id == id); // guardo qual cliente quero atualizar

    if (!client) return res.status(204).json();

    const { name, email } = req.body; // no body tem as informações do cliente novo que quero salvar

    client.name = name; // atualiza as informações do cliente com o id que achei 
    client.email = email; // aualiza o e-mail

    res.json(client); // mando para a respsota o cliente (o que qu queria)
});

app.delete(endpoint + '/:id', function(req, res) { 
    const { id } = req.params;
    const clientsFiltered = data.filter(client => client.id != id) // deleto o cliente utilizando filter

    res.json(clientsFiltered); // mando para a respsota a nova lista de clientes

});

//app.listen(porta, callback function que é executada quando inicio o servidor)
app.listen(3000, function() {
    console.log("server is running");
})