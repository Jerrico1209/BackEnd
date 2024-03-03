const hostname = '127.0.0.1'
const port = '3000'

const express = require('express')
const app = express()
const users = require('./users')
const morgan = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const multer = require('multer')
const fs = require('fs')
const upload = multer({dest: "public"})
const path = require('path')
const cors = require('cors')

app.use(morgan('dev'))

app.use(express.urlencoded( { extended: true } ))
app.use(express.json())

app.use(cors({
    origins : "http://127.0.0.1:5500/"
}))

// Main Code
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Hello!!! Welcome to the main page',
    })
})
app.get('/users', (req, res) => {
    res.status(200).json({
        status: 'Success',
        data: users,
    })
})

// Search using lower case or upper case
app.get('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase()
    const user = users.find(user => user.name.toLowerCase() === name ) 
    if (user) {
        res.json(user)
    }else{
        res.status(404).json({
            message: 'Data user tidak di temukan',
        })
    }
})

// Updating the user Data
app.put('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase()
    const userIndex = users.findIndex(user => user.name.toLowerCase() === name)
    if (userIndex !== -1) {
        const { name } = req.body
        users[userIndex].name = name
        res.json({
            status: 'Success',
            data: users[userIndex],
        })
    } else {
        res.status(404).json({
            message: 'Data user tidak di temukan',
        })
    }
})

// Deleting user bt the name
app.delete('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase()
    const userIndex = users.findIndex(user => user.name.toLowerCase() === name)
    if (userIndex !== -1) {
        users.splice(userIndex, 1)
        res.status(200).json({
            status: 'Success',
            message: 'User deleted successfully',
        })
    } else {
        res.status(404).json({
            message: 'Data user tidak di temukan',
        })
    }
})

// Adding a New User to the list
app.post( '/users', (req, res)=>{
    const {id, name} = req.body
    users.push( { id : id , name : name } )
    res.status(201).json({
        status:'success',
        data: users,
    })
});

// Endpoint for uploading file
app.post('/upload', upload.single("file"), (req, res) => {
    const file = req.file
    if (file){
        const target = path.join(__dirname, 'public', file.originalname)
        fs.renameSync(file.path, target)
        res.send('File berhasil diupload')
    }else{
        res.send("File gagal diupload")
    }
})
// Main Code

//Middleware

//Static file
app.use(express.static(path.join(__dirname, 'public')))

//Middleware penanganan error routing
app.use((req, res, next ) => {
    res.status(404).json({
        status: 'Error',
        message: 'Resource tidak ditemukan',
    })
})

//Middleware penanganan error 
const errorHandling = (err, req, res, next) => {
    res.status(501).json({
        status: 'Error',
        message: 'Terjadi kesalahan pada server',
    })
    app.use(errorHandling)
}
app.listen(port, () =>
    console.log(`Server is running at: http://${hostname}:${port}`))