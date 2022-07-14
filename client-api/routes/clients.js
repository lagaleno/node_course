const { getDbArray, writeOnDb } = require('./../utils/utils.js')

const getClients = (baseURL, db, app) => {
    app.get(baseURL, (req, res) => {
        res.json(db)
    })
}

const getClient = (baseURL, db, app) => {
    app.get(baseURL + '/:id', (req, res) => {
        const { id } = req.params
        const client = db.find(cli => cli.id == id)

        if (!client) return res.status(404).json()
        res.json(client)
    })
}

const addClient = (baseURL, dbPath, app) => {
    app.post(baseURL, (req, res) => {
        const { name, mail, gender } = req.body
        arr = getDbArray(dbPath)
        add = {
            id: arr[arr.length - 1].id + 1,
            name,
            mail,
            gender
        }
        arr.push(add)
        writeOnDb(dbPath, arr)
        res.json(add)
    })
}

const editClient = (baseURL, dbPath, app) => {
    app.put(baseURL + '/:id', (req, res) => {
        const { id } = req.params

        const arr = getDbArray(dbPath)
        const element = arr.find(e => e.id == id) 
    
        if (!element) return res.status(404).json() // cliente não cadastrado
    
        const { name, mail, gender } = req.body 
        element.name = name
        element.mail = mail 
        element.gender = gender 

        writeOnDb(dbPath, arr)
        res.json({
            id: element.id,
            name: element.name,
            mail: element.mail,
            gender: element.gender
        })
    })
}

const deleteClient = (baseURL, dbPath, app) => {
    app.delete(baseURL + '/:id', (req, res) => {
        const { id } = req.params
        const arr = getDbArray(dbPath)
        const filtered = arr.filter(e => e.id != id) // guardo qual cliente quero deletar
        writeOnDb(dbPath, filtered)

        res.json("client deleted")
    })
}

module.exports = {
    getClients,
    getClient,
    addClient,
    editClient,
    deleteClient
}