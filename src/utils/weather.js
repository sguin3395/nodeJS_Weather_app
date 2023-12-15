const request = require('request');

const weather = (lat, lon, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=e06db56bd1cb1c8ed732a39577874069&query='+ encodeURIComponent(lat) +','+ encodeURIComponent(lon) +'&units=f';

    request({ url, json: true }, (error, { body }) => {
        // console.log(error);
        if(error){
            callback('Unable to connect to the weather service!', undefined);
        } else if(body.error){
            callback('Unable to find location!', undefined);
        } else {
            // const data = JSON.parse(response.body);
            // console.log(response.body.current);
            callback(undefined, {
                weatherDescription: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    });
}

module.exports = weather