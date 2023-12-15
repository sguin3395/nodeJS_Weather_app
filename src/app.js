const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../..'));

const app = express();

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>');
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sitakanta Guin'
    });
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Sitakata',
//         age: 27
//     },
//     {
//         name: 'Sarah',
//         age: 29
//     }]);
// })

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is some helpful text',
        name: 'Sitakanta Guin'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Sitakanta Guin'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
    
        weather(latitude, longitude, (error, data) => {
            if(error){
                return res.send({ error });
            }

            res.send({
                weather: data,
                location,
                address: req.query.addess
            })
            
            // console.log('Location: ', location);
            // console.log('Weather: ', data);
        });
    })

    // res.send([{
    //     location: 'Bhubaneswar',
    //     forecast: 'sunny',
    //     address: req.query.address
    // }])
});

app.get('/products', (req, res) => {
    // console.log(req.query);
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
        
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        message: 'Help article not found',
        name: 'Sitakanta Guin'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Error',
        message: 'Page not found',
        name: 'Sitakanta Guin'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is up on port 3000')
});