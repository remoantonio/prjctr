const express = require('express')
const router = express.Router()
const moment = require('moment')

////////////////////////////////////////////////////////////////
// Models
////////////////////////////////////////////////////////////////

const Project = require('../models/projectModel')

////////////////////////////////////////////////////////////////
// Routes
////////////////////////////////////////////////////////////////

// index
router.get('/', (req, res) => {
    Project.find({}, (err, projects) => {
        if (err) {console.log(err)}
        // console.log(projects)
        res.render('../views/project/index.ejs', {
            listProjects: projects,
            tabTitle: 'Project List'
        })
    })
})

// create
router.post('/', (req, res) => {
    console.log(req.body)
    Project.create(req.body, (err, project) => {
        if (err){console.log(err)}
        console.log(project)
    })
    res.redirect('/prjctr/project')
})

// new project
router.get('/new', (req, res) => {
    res.render('../views/project/newProject.ejs', {
        edit: false,
        tabTitle: 'Create New Project'
    })
})

// new task
router.post('/task/:id', (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    Project.findByIdAndUpdate(req.params.id, {$push : {tasks: req.body}}, {new : true}, (err, project) => {
        if (err) {console.log(err)}
        console.log(project)
        res.redirect('/prjctr/project/' + project.id)
    })
})

// show
router.get('/:id', (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        if (err) {console.log(err)}
        console.log(project)
        res.render('../views/project/show.ejs', {
            tabTitle: project.projectName,
            currentProject: project,
            moment : moment
        })
    })
})

module.exports = router