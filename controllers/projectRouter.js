const express = require('express')
const router = express.Router()

////////////////////////////////////////////////////////////////
// Models
////////////////////////////////////////////////////////////////

const Project = require('../models/projectModel')

////////////////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////////////////

// index
router.get('/', (req, res) => {
    res.send('Here is the index')
})

// create
router.post('/', (req, res) => {
    console.log(req.body)
    Project.create(req.body, (err, project) => {
        if (err){console.log(err)}
        console.log(project)
    })
    res.redirect('/')
})
// new project
router.get('/new', (req, res) => {
    res.render('../views/project/newProject.ejs', {
        edit: false,
        tabTitle: 'Create New Project'
    })
})
module.exports = router