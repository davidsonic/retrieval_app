const cors = require('cors')
const express = require('express')

const path = require('path')
const hbs = require('hbs')
const _ = require('underscore')

const torchserve = require('./utils/torchserve')

const app = express()
const port = process.env.PORT || 3000

// cors
app.use(cors())
app.options('*', cors());

// define path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicDirectoryPath))

// introduce router
const gallery = require('./route/gallery');
app.use('/gallery', gallery); 


app.get('', (req, res)=>{
    res.render('index')
})

// search
app.get('/search', (req, res)=>{
    if(!req.query.id){
        return res.render(req.query.url, {
            error: "image id cannot be empty!"
        })
    }
    gallery = ['41oawD8KPTL', '41QWsm90iEL', '51kZL0C4zrL', '61mzn2dbPnL', '71eQL0Z+O8L', '71wwOer6HlL' ,'71zaxk-sijL',
    '91qHNSL6AbL', '71ZsX4-4zWL', '81sCiRipn7L', '811784ax3tL', 'kitten_small']
    res.render(req.query.url, {
        id: _.sample(gallery, 6)
    })

})

app.get('/predict', (req, res)=>{
    if(!req.query.id){
        return res.render('404', {
            errorMessage: 'Page not found!'
        })
    }
    torchserve(req.query.id, publicDirectoryPath, (error, predJSON)=>{
        if(error) return res.render('404',{
            errorMessage: error
        })
        res.render('example_query', {
            prediction: predJSON.message
        })
    })
})


app.get('*', (req, res)=>{
    res.render('404', {
        errorMessage: "Page not found"
    })
})

app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})