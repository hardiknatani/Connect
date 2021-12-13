const express = require('express')
const port = 3000;
const app = express();
const path = require('path')
const db = require("./config/mongoose")
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

app.use(cookieParser())
app.use(express.urlencoded())
app.use(express.static("./assets"))
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.set('view engine','ejs')
app.set('views',path.join(__dirname, 'views'))
app.use(session({
    name:'ConnectAuthCookie',
    secret:'blehbleh',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*30)
    },
    store: new MongoStore(
        {
            mongoUrl: "mongodb://localhost/connect_userdb",
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMiddleware.setFlash);

app.use("/",require('./routes/index'))


app.listen(process.env.PORT ||port,(err)=>{
    if (err){
        console.log(err)
    }
    else{
        console.log('Server up and running on port: ', port)
    }
})

