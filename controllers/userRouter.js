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
                        console.log("currentUser",req.session.currentUser)
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
    // console.log(false)
    // console.log(req.query.match)
    // console.log(req.query.match == false)
    res.render('../views/user/newUser.ejs', {
        tabTitle : 'User Creation',
        problem : req.query.problem
    })
})


module.exports = router