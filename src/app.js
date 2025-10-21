const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const request = require('request');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express()

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../templates/views')
const partialsDir = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewDir);
hbs.registerPartials(partialsDir);

// Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'THERESA'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'THERESA'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        msg: 'ITS OK NOT TO BE OK!',
        name: 'THERESA'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude}= {}) => {
        if(error){
            return res.send({error})
        }
        const pinLocation = {
            latitude: latitude, 
            longitude: longitude
        }
        forecast(pinLocation, (error, forecastData) => {
            if(error){
                res.send({ error})
            }else{
                console.log(forecastData)
                res.send({
                    forecast: forecastData,
                    address: req.query.address
                })
            }
        })
        
    })
})


app.get('/products', (req, res) => {
    console.log(req.query)
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send(
    {
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        msg: 'Help article not found',
        name: 'THERESA'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        msg: 'Page not found',
        name: 'THERESA'
    })
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
})