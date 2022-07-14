// CRUD

// Posso substituir as 3 linhas abaixo usando destructing
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectId

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectId() // criar os meus IDs

// set up the connection with the db
// callback function roda quando a tentativa de conexão acaba (com erro ou sucesso)
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('unable to connect to database')
    }

    const db = client.db(databaseName) // crio o meu db com o nome passado de parâmetro

    // C -> CREATE

    // crio uma collection (tableas no SQL). Em uma aplicação tenho várias collections
    // db.collection('users').insertOne({
    //     // _id: id, // gerei o id
    //     name: 'Vivian',
    //     age: 24
    // }, (error, result) => {
    //     // callback function para quando a inserção acabou (pode ter sucesso ou terminar em erro)
    //     if (error) {
    //         return console.log('unable to insert user')
    //     }
    //     // get Ids from what I inserted
    //     console.log(result.insertedId)
    // }) 

    // primeiro parâmetro é um array de documents
    // db.collection('users').insertMany([
    //     {
    //         name: 'Jane',
    //         age: 28
    //     },
    //     {
    //         name: 'Hunter',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result)
    // })

    let tasks = [
        {
            description: 'Do yoga', 
            status: true
        },
        {
            description: 'Study',
            status: false
        },
        {
            description: 'Work',
            status: true
        }
    ]

    // Create (C from crud)
    // db.collection('tasks').insertMany(tasks, (error, result) => {
    //     if (error) return console.log(error)
    //     console.log(result)
    // })

    // R -> READ

    // se tiver mais de um document com name Jane, findOne vai retornar o primeiro
    db.collection('users').findOne({ name: 'Jane' }, (error, user) => {
        if (error) return console.log(error)
        // não achar o dado o no BD não é visto como erro, é retornado um null
        // console.log(user)
    })

    db.collection('users').find({ age: 27 }).toArray((error, users) => {
        if (error) return console.log(error)
        // console.log(users)
    }) // find retorna um ponteiro para o dado, por isso usamos o toArray com o callback para listar os resultados

    // U -> UPDATE (using promises)

    const updatePromise = db.collection('users').updateOne({ 
        _id: new ObjectId("62cda40d4c6818b59540d14e") // target document accordingly
    },
    {
        // $set -> operator to update
        $set: {
            name: 'Mike'
        }
    })
    
    updatePromise.then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })

    // D -> DELETE
    const deletePromise = db.collection('users').deleteMany({
        age: 27
    })
    
    deletePromise.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})


