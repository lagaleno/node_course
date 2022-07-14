const path = require('path')
const express = require('express') // import express
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
// com isso já vejo o index.html renderizado no navegador
// com isso o app.get('') não vai mais rodar

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars enfine and views loactions
// set a view engine
app.set('view engine', 'hbs') // hbs me permite páginas dinâmicas, se quero páginas estáticas sigo com o caminho de ir no diretório public
app.set('views', viewsPath) // seto o diretório que tem as views (o diretório templates)
hbs.registerPartials(partialsPath)

// Setup static directory to use
app.use(express.static(publicDirectory)) // customizar o servidor

app.get('', (req, res) => {
    // primeiro parâmetro: caminho do arquivo da view
    // segundo parâmetro: informações que queremos que o arquivo da view tenha acesso 
    res.render('index', {
        title: 'Weather App',
        name: 'Larissa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Larissa' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help me!',
        text: 'This is some helpful text',
        name: 'Larissa'
    })
})

// // a função descreve o que fazer quando a pessoa acessa a rota descrita no primeiro link
// app.get('', (req, res) => {
//     res.send('Hello express!') // send envia info para quem fez o request

// }) // o que retorna quando a pessoa faz uma requisição para a rota

// app.get('/help', (req, res) => {
//     res.send('help page')
// })

// app.get('/about', (req, res) => {
//     res.send('about page')
// })

app.get('/weather', (req, res) => {
    // req.query pega parâmetros que foram passados pela URL
    // req.query.address estou contando que vão passar um parâmetro address
    console.log(req.query)
    // http://localhost:3000/weather?lat=37.8267&lon=-122.4233
    if (!req.query.lat || !req.query.lon) {
        return res.send({ 
            error: "must provide a latitude and longitude"
        })
    }

    forecast(req.query.lat, req.query.lon, (error, forecastData) => {
        if (error) return res.send({ error })
        
        res.send({
            forecast: forecastData.weather_descriptions[0],
            temperature: forecastData.temperature,
            latitude: req.query.lat,
            longitude: req.query.lon
        })
        
    })

})

// dar match com qualquer rota que tenha help e qualquer coisa depois
app.get('/help/*', (req, res) => {
    res.render('error', {
        text: 'Help article not found',
        name: 'Larissa'
    })
})

// needs to come last
// * -> match anything that has no been matched before
app.get('*', (req, res) => {
    res.render('error', {
        text: 'Page not found',
        name: 'Larissa'
    })
})

app.listen(3000, () => {
    console.log('server is up')
}) // qual porta está ouvindo o express