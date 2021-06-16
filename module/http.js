
const https = require('https')

let instance = {}

instance.sendGetHttp = function (options,callback) {
    console.log('发送请求')
    console.log(options)
    const req = https.request(options, res => {
        console.log('huilai')
        res.on('data', d => {
            console.log(d)
            callback(d)
        })
    })
    req.on('error', error => {
        callback(error)
        console.log(error)
    })
    req.end()
}  
module.exports = instance

