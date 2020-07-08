const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new mongoose.Schema({
    projectName: String,
    tasks: [{type: String, complete: Boolean}],
    complete: Boolean
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project