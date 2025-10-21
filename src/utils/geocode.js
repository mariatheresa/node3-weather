const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoidGVzczEyMzM0IiwiYSI6ImNtZ3JmZzBkazJ0dmYybHBxZmc5MnFkN28ifQ.24sduq23yCRR1PNrmbfTgg&limit=1'

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)          
        } else {
            if(body.error_code){
                callback('Unable to find location. Try another search.', undefined)
            }else{
                if(body.features.length === 0){
                    callback('Unable to find location. Try another search.', undefined)
                }else{
                    callback(undefined, {
                        latitude: body.features[0].properties.coordinates.latitude,
                        longitude: body.features[0].properties.coordinates.longitude
                    })
                }
            }  
        }
    })  
}

module.exports = geocode