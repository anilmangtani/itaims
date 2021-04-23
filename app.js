const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 80
const router = require('./routes/itaim')
const ExpressLayout = require('express-ejs-layouts')
const path = require('path')
const fs = require('fs')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')


//mongoose work
mongoose.connect('mongodb://localhost/itcrud', {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Database connected...');
}).catch(err=>{
    console.log('Connection failed...')
})

//Session config : Session lin works as middleware
app.use(session({
    secret: 'Anil',
    resave:false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/itcrud'}),
    saveUninitialized: false,
    cookie:{maxAge: 1000 * 60 * 24}
}))

//Passport Config
const passportInit = require('./src/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Global MiddleWare
app.use((req, res, next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})


app.use('/static', express.static('public/static'))

//ejs related work
app.use(ExpressLayout);
app.set('view engine', 'ejs');
app.set('../views', path.join(__dirname,'views'))

 

//Middle wares
app.use('/', router)











app.listen(port, (req,res)=>{
    console.log(`this is running on port ${port}`)
})
