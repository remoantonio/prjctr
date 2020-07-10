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
            currentProject: projects,
            tabTitle: 'Project List'
        })
    })
})

// delete project
router.delete('/:id', (req, res) => {
    Project.findByIdAndDelete(req.params.id, (err, projects) => {
        if (err) {console.log(err)}
        res.redirect('/prjctr/project')
    })
})


// create project
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
        tabTitle: 'Create New Project',
        actionForm: '/prjctr/project/',
    })
})

// new task
router.post('/task/:id', (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    Project.findByIdAndUpdate(req.params.id, {$push : {tasks: req.body}}, {new : true}, (err, project) => {
        if (err) {console.log(err)}
        // console.log(project)
        res.redirect('/prjctr/project/' + project.id)
    })
})

// delete task
router.delete('/task/:id/:task', (req, res) => {
    console.log(req.params)
    Project.findById(req.params.id, (err, project) => {
        if (err) {console.log(err)}
        let holder =[]
        for (let i = 0; i < project.tasks.length; i++) {
            if (project.tasks[i].id != req.params.task) {
                holder.push(project.tasks[i])
            }
        }
        // console.log(project.tasks[0].id)
        // console.log(holder)
        Project.findByIdAndUpdate(req.params.id, {$set: {tasks : holder}}, {new: true}, (err, project) => {
            if (err) {console.log(err)}
            res.redirect('/prjctr/project/' + project.id)
        })
    })
})

// complete project
router.put('/complete/:id', (req, res) => {
    // console.log(req.body)
    // console.log(req.params)
    Project.findById(req.params.id, (err, project) => {
        if (err) {console.log(err)}
        project.complete = true
        Project.findByIdAndUpdate(req.params.id, project, {new: true}, (err, project) => {
            if (err) {console.log(err)}
            res.redirect('/prjctr/project/' + project.id)
        })
    })
})

// update project
router.put('/:id', (req, res) => {
    console.log('update route')
    Project.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, project) => {
        if (err) {console.log(err)}
        res.redirect('/prjctr/project/' + project.id)
    })
})

// edit project
router.get('/:id/edit', (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        res.render('../views/project/newProject.ejs', {
            tabTitle : 'Edit Project',
            currentProject : project,
            edit : true,
            moment : moment,
            actionForm: '/prjctr/project/' + project.id + '?_method=Put',
        })
    })
})

// complete task
router.put('/task/complete/:id/:task', (req, res) => {
    // console.log(req.body)
    // console.log(req.params)
    Project.findById(req.params.id, (err, project) => {
        if (err) {console.log(err)}
        let holder =[]
        // console.log("project testing",project)
        for (let i = 0; i < project.tasks.length; i++) {
            if (project.tasks[i].id == req.params.task.replace(/ /g, '')) {
                project.tasks[i].complete = true
                holder.push(project.tasks[i])
            } else {
                holder.push(project.tasks[i]);
            }
        }
        // console.log(project.tasks[0].id)
        console.log("testing",holder)
        Project.findByIdAndUpdate(req.params.id, {$set: {tasks : holder}}, {new: true}, (err, project) => {
            if (err) {console.log(err)}
            res.redirect('/prjctr/project/' + project.id)
        })
    })
})

// update task
router.put('/task/:id/:task', (req, res) => {
    // console.log(req.body)
    // console.log(req.params)
    Project.findById(req.params.id, (err, project) => {
        if (err) {console.log(err)}
        let holder =[]
        // console.log("project testing",project)
        for (let i = 0; i < project.tasks.length; i++) {
            // console.log(i,'projecttasks',project.tasks[i].id.toString())
            // console.log('reqparamstask',req.params.task.toString())
            // let x = `'` + req.params.task.replace(/ /g, '') + `'`
            // let y = `'` + project.tasks[i].id + `'`
            // console.log(x)
            // console.log(y)
            // console.log(x==y)
            // console.log(project.tasks[i].id == req.params.task.replace(/ /g, ''))
            if (project.tasks[i].id == req.params.task.replace(/ /g, '')) {
                project.tasks[i].task = req.body.task
                holder.push(project.tasks[i])
            } else {
                holder.push(project.tasks[i]);
            }
        }
        // console.log(project.tasks[0].id)
        console.log("testing",holder)
        Project.findByIdAndUpdate(req.params.id, {$set: {tasks : holder}}, {new: true}, (err, project) => {
            if (err) {console.log(err)}
            res.redirect('/prjctr/project/' + project.id)
        })
    })
})

// edit task
router.get('/task/:id/:task', (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        if (err) {console.log(err)}
        // console.log(project)
        res.render('../views/project/show.ejs', {
            tabTitle: project.projectName,
            currentProject: project,
            moment : moment,
            edit : true,
            currentTask : req.params.task
        })
    })
})

// show
router.get('/:id', (req, res) => {
    Project.findById(req.params.id, (err, project) => {
        if (err) {console.log(err)}
        // console.log(project)
        res.render('../views/project/show.ejs', {
            tabTitle: project.projectName,
            currentProject: project,
            moment : moment,
            edit : false
        })
    })
})

module.exports = router