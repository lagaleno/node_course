const express = require('express'); // coloco a dependência do express
const app = express(); // instancio o express para poder usar

app.use(express.json())

app.listen(3000, function() {
    console.log("server is running");
})

module.exports = app