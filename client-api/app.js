const app = require('./server.js')
const { getClients, getClient, addClient, editClient, deleteClient } = require('./routes/clients')
const { db, dbPath, baseURL } = require('./utils/variables.js')


getClients(baseURL, db, app) // não sei se entendi

getClient(baseURL, db, app)

addClient(baseURL, dbPath, app)

editClient(baseURL, dbPath, app)

deleteClient(baseURL, dbPath, app)

