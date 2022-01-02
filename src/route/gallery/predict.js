const axios = require('axios');

const predict = (img, callback)=>{
    const uri = 'https://rxlfm8bjh0.execute-api.us-east-1.amazonaws.com/test/torchservedensenet'
    axios.post(uri, {
        url: img
    })
    .then(({data})=>{
        callback(undefined, JSON.stringify(data), img)
    })
    .catch(error=>{
        callback(error, data, img)
    })
}

module.exports = (req, res)=>{
    if(!req.query.img){
        return res.send({
            error: 'img is None'
        })
    }

    // predict
    predict(req.query.img, (error, data, url)=>{
        console.log('pred: ' + data)
        console.log('url: ' + url)
        if(error || JSON.parse(data).errorMessage) {
            res.send({
                error: true,
                predictoin: null, 
                url: null, 
            })
        }else{
            res.send({
                error: null,
                prediction: data,
                url: url
            })
        }

    })

}