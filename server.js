const express = require('express');
const session = require('express-session')
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

////////////////////////////////////////////////////////////////
// Controllers
////////////////////////////////////////////////////////////////
const userController = require('./controllers/userRouter.js')
const projectController = require('./controllers/projectRouter.js')

////////////////////////////////////////////////////////////////
// Middleware
////////////////////////////////////////////////////////////////

// app middleware
app.use(express.urlencoded({ extended: false }));
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

mongoose.connect('mongodb://localhost:27017/prjctr', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false,});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});

////////////////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////////////////

app.get('/prjctr', (req, res) => {
    res.send('Hello World')
})
////////////////////////////////////////////////////////////////
// Listening
////////////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log('listening on port: ', port);
});