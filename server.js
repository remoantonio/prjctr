const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const app = express();
const PORT = process.env.PORT || 3000;

////////////////////////////////////////////////////////////////
// Controllers
////////////////////////////////////////////////////////////////
const userController = require('./controllers/userRouter.js')
const projectController = require('./controllers/projectRouter.js')

////////////////////////////////////////////////////////////////
// Middleware
////////////////////////////////////////////////////////////////

// app middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
}));
// controller  middleware
app.use('/prjctr/user', userController)
app.use('/prjctr/project', projectController)

////////////////////////////////////////////////////////////////
// Database
////////////////////////////////////////////////////////////////

// Define Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `prjctr`;
const db = mongoose.connection;

// Connect to Database
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,});

// Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// Open Connection
db.on('open' , ()=>{ console.log('Ready to go.')});

////////////////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.redirect('/prjctr')
})
app.get('/prjctr', (req, res) => {
    console.log('homepage',req.session.currentUser)
    res.render('./user/home.ejs', {
        tabTitle : 'Home'
    })
})
////////////////////////////////////////////////////////////////
// Listening
////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});