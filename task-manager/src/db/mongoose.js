const mongoose = require('mongoose')

// similar to MongoClient.connect
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// constructor function for the User model
const User = mongoose.model('User', {
    name: {
        // configurations for the field name
        type: String
    },
    age: {
        type: Number
    }
})

// instanciando um usuário do modelo user, por exemplo
const me = new User({
    name: 'Andrew',
    age: 27
})

// salvar esse usuário no bd
me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error', error)
})