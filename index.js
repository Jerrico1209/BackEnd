const express = require ('express')
const app = express()
const hostname = '127.0.0.1'
const port = 3000

const fs = require('fs')
const morgan = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const path = require('path')
const multer =  require('multer')
const upload = multer({ dest: "AVITA"})
const cors = require('cors')


//Middleware Morgan
morgan('tiny')
//Middleware Morgan
//Middleware Body Parser
// app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.urlencoded({extended: true}))
//parse JSON
// app.use(bodyParser.json())
app.use(express.json())
//Middleware Body Parser
//Middleware CORS
app.use(cors())
//Middleware CORS



//Main Code
app.get('/', (req, res) => res.send('This is the main page'))

app.get('/about', (req, res) => res.status(200).json({
    status : 'Success',
    messagge: 'This is the about page',
    name : 'Walangitan, Jerrico',
    class : 'Back-End A'
}))

app.post('/login', (req, res) => {
    const {username, password} = req.body
    res.send(`Anda telah login dengan username ${username} dan password ${password}.`)
})

app.post ("/upload", upload.single("file"), (req, res) =>{
    const file = req.file
    if (file){
        const target = path.join(__dirname, "AVITA", file.originalname)
        fs.renameSync(file.path, target)
        res.send("file berhasil di upload")
    }else{
        res.send("file gagal di upload")
    }
})
//End Main Code

//Middleware file
app.use(express.static(path.join(__dirname,'AVITA')))
//Middleware file

//Middleware CORS
app.get('/products/:id', (req, res, next) =>{
    res.json({
        status: 'Success',
        messagge: 'This is CORS-enable for all origins!'
    })
})
//Middleware CORS

//Middleware notFound
app.use((req,res,next)=>{
    res.status(404).json({
        status : 'Error',
        messagge : 'Source not found'
    })
    next()
})
//Middleware notFound

//Middleware Error
app.use((err, req, res, next) => {
    res.json({
        status: 'error',
        messagge : 'Something went wrong!',
    })
    next()
})
//Middleware Error


app.listen(port, () =>
    console.log(`Server running at http://${hostname}:${port}`))