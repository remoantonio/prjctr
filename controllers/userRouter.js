const bcrypt = require('bcrypt')
const express = require('express')
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
    if (req.body.password == req.body.password2) {
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        delete req.body.password2
        console.log(req.body)
        res.redirect('/')
    } else {
        res.redirect('/prjctr/user/new?match=false')
        // res.render('../views/user/newUser.ejs', {
        //     tabTitle : 'User Creation',
        //     match : false
        // })
    }
})

// new user
router.get('/new', (req, res) => {
    console.log(false)
    console.log(req.query.match)
    console.log(req.query.match == false)
    res.render('../views/user/newUser.ejs', {
        tabTitle : 'User Creation',
        match : req.query.match
    })
})


module.exports = router