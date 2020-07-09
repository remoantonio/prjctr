const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    dueDate: Date,
    tasks: [{type: String, complete: {type:Boolean, default: false}}],
    complete: {type: Boolean, default: false}
})

const Project = mongoose.model('Project', projectSchema)

module.exports = Project