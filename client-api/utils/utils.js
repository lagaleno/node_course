const fs = require('fs')

const getDbArray = (dbPath) => {
    let file = fs.readFileSync(dbPath,"utf-8")
    let arr = JSON.parse(file) // json to array
    return arr
}

const writeOnDb = (dbPath, arr) => {
    // recieve array to be converted to json an then writeen on db file
    json = JSON.stringify(arr)
    fs.writeFileSync(dbPath, json)
}

module.exports = {
    getDbArray,
    writeOnDb
}