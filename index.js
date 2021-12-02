const express = require('express')
const port = 3000;
const app = express();
const path = require('path')
const db = require("./config/mongoose")
const cookieParser = require('cookie-parser')


app.use(cookieParser())
app.use(express.urlencoded())
app.use("/",require('./routes/index'))
app.use(express.static("./assets"))


app.set('view engine','ejs')
app.set('views',path.join(__dirname, 'views'))

app.listen(port,(err)=>{
    if (err){
        console.log(err)
    }
    else{
        console.log('Server up and running on port: ', port)
    }
})

