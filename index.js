const http = require('http')
const moment = require('moment')
const members = require('./members')
const getUsers = require('./users')


const server = http.createServer( async (req, res) =>{
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/json')
    const url = req.url
    let responseData = {}

    if (url === '/about'){
        responseData = {
            Status: 'success',
            Message: 'response success',
            Description: 'Exercise #02',
            Date: moment().format(),
            Data: members
        }
    }
    else if (url === '/users'){
        responseData = {
            Status: 'success',
            Message: 'response success',
            Data: await getUsers()
        }
    }
    else{
        res.write('This is the home page!!!')
    }

    res.write(JSON.stringify(responseData))
    res.end()
})

const hostname = '127.0.0.1'
const port = 3000
server.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}/`)
})