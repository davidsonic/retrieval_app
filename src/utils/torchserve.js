const request = require('request')
const path = require('path')

const torchserve = (imgPath, publicDir, callback)=>{
    const url = 'http://127.0.0.1:8080/predictions/densenet161 -T ' + path.join(publicDir, imgPath)
    console.log('url:', url)
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('unable to predict', undefined)
        }
        else{
            console.log(body)
            callback(undefined, body)
        }
    })
}

module.exports = torchserve