const express = require('express'); 

const gallery = express.Router(); 

gallery.get('/', (req, res)=>{
    res.redirect('/#example_query'); 
});

gallery.get('/example_query', require('./gallery/example_query')); 

gallery.get('/image_url', require('./gallery/image_url'));

gallery.get('/image_upload', require('./gallery/image_upload'));

// predict
gallery.get('/predict', require('./gallery/predict'));

module.exports = gallery; 