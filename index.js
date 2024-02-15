const express = require ('express')
const morgan = require('morgan')
const errorhandler = require("errorhandler")
const app = express()
const hostname = '127.0.0.1'
const port = 3000 

//const import start
const users = require("./users")
//const import end


//Middleware log start
app.use(morgan('tiny'))
//Middleware log end

//Main Code
app.get('/', (req, res) =>
    res.send('This is the home page'))

app.get('/users', (req, res) =>
    res.send(users))

app.get('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase()
    const user = users.find(user => user.name.toLowerCase() === name)
    if (user) {
        res.json(user)
    }else{
        res.status(404).json({
            Message : 'Data user tidak ditemukan',
        })
    }
})

//Main Code

//Middleware Start
app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        Message: "resourse tidak ditemukan"
    })
    next()
})

const errorHandling = (err, req, res, next) => {
    res.json({
        status: "error",
        message: "terjadi kesalahan pada server",
    })
    app.use(errorHandling)
}
//Middleware End

app.listen(port, () => 
    console.log(`Server running at http://${hostname}:${port}`))
