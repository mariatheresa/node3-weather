const request = require('request');

const forecast = (location, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=352c71aa9d4abaad7584c31899df39df&query=' + location.latitude + ',' + location.longitude + '&units=m'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else {
            if(body.error){
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, "We are in " + body.location.country + ". " + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.' + 'hummidity is '+body.current.humidity + '%.')
            }
        }
    })
}

module.exports = forecast
