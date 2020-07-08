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

// index
router.get('/new', (req, res) => {
    res.send('working')
})


module.exports = router