const request = require('request');

// const geocodeUrl = 'https://geocode.maps.co/search?q=bhubaneswar'

// request({ url: geocodeUrl, json: true }, (error, response) => {
    // if(error){
    //     console.log('Unable to connect to the location service');
    // } else if(response.body.length === 0){
    //     console.log('Unable to find location!');
    // } else {        
    //     console.log('Latitude: ', response.body[0].lat, '\nLongitude: ', response.body[0].lon);
    // }
// })

const geocode = (address, callback) => {
    const url = 'https://geocode.maps.co/search?q='+ encodeURIComponent(address) +'&limit=1';
    
    request({ url, json: true }, (error, { body }) => {
        if(error){
            callback('Unable to connect to the location service', undefined);
        } else if(body.length === 0){
            callback('Unable to find location!', undefined);
        } else {        
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].display_name
            });
        }
    });
}

module.exports = geocode