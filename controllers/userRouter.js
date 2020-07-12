const bcrypt = require('bcrypt')
const express = require('express')
const sessions= express.Router();
const router = express.Router()

////////////////////////////////////////////////////////////////
// Models
////////////////////////////////////////////////////////////////

const User = require('../models/userModel')
const Project = require('../models/projectModel')

////////////////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////////////////

// login or signup splash
router.get('/required', (req, res) => {
    res.render('../views/user/userArea.ejs', {
        tabTitle: 'User Area'
    })
})

// delete user session
router.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

// login user
router.post('/login', (req, res) => {
    // console.log(req)
    // console.log(req.body)
    User.findOne({userName: req.body.userName}, (err, user) => {
        if (err) {
            console.log(err)
            res.redirect('/prjctr/user/login?problem=Problem with database.')
        } else if (!user){
            // console.log(!user)
            res.redirect('/prjctr/user/login?problem=User not found.')
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.currentUser = user
                // console.log('logged in',req.session.currentUser)
                res.redirect('/')
            } else {
                res.redirect('/prjctr/user/login?problem=Password does not match.')
            }
        }
        // if (user == null) {
        //     if (req.body.password == req.body.password2) {
        //         req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        //         delete req.body.password2
        //         // console.log(req.body)
        //     } else {
        //         res.redirect('/prjctr/user/login?problem=Passwords do not match')
        //     }
        // } else {
        //     res.redirect('/prjctr/user/login?problem=User Name is not available')
        // }
    })
})

// login user
router.get('/login', (req, res) => {
    res.render('../views/user/newUser.ejs', {
        tabTitle : 'User Login',
        problem : req.query.problem,
        create: false,
        actionForm: 'login'
    })
})

// create user
router.post('/new', (req, res) => {
    // console.log(req)
    // console.log(req.body)
    User.findOne({userName: req.body.userName}, (err, user) => {
        if (err) {console.log(err)}
        if (user == null) {
            if (req.body.password == req.body.password2) {
                req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
                delete req.body.password2
                // console.log(req.body)
                User.create(req.body, (err, user) => {
                    if (err) {
                        console.log(err)
                        res.redirect('/prjctr/user/new?problem=Problem with user creation')
                    } else {
                        req.session.currentUser = user
                        // console.log("currentUser",req.session.currentUser)
                        res.redirect('/')    
                    }
                })
            } else {
                res.redirect('/prjctr/user/new?problem=Passwords do not match')
            }
        } else {
            res.redirect('/prjctr/user/new?problem=User Name is not available')
        }
    })
})

// new user
router.get('/new', (req, res) => {
    res.render('../views/user/newUser.ejs', {
        tabTitle : 'User Creation',
        problem : req.query.problem,
        create: true,
        actionForm: 'new'
    })
})


module.exports = router