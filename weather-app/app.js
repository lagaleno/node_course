// const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// exemplo de callback em cadeia 
// geocode('Boston', (error, { latitude, longitude, location }) => { 
//     if (error) return console.log(error)
    
//     // chaining callback
//     // data vai estar disponível depois da chamada de geocode para poder usar e lidar com o assincrono
//     forecast(latitude, longitude, (error, forecastData) => {
//         if (error) return console.log(error) 
        
//         console.log(location)
//         console.log(forecastData)
//     })
    

// })

forecast(37.8267,-122.4233, (error, forecastData) => {
    if (error) return console.log(error) 
    console.log(forecastData)
})
