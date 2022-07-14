const request = require('request');
const access_key = require('./key')

const forecast = (lat, lon, callback) => {
    // const url = 'http://api.weatherstack.com/current?access_key='+ access_key + '&query=37.8267,-122.4233'
    const url = 'http://api.weatherstack.com/current?access_key='+ access_key + '&query=' + lat.toString() + ',' + lon.toString()

    // json = true vai fazer o parse na hora do request
    // exemplo de destructing
    request({ url: url, json: true}, (error, res) => {
        if (error) callback('unable to connect', undefined)
        else if (res.body.error) callback(res.body.error.info, undefined)
        else callback(undefined, res.body.current)
    })
}   

module.exports = forecast