const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    userName: {type: String, unique: true, required: true},
    password: {type: String, required:true},
    projects: [{projectID: String}]
})

const User = mongoose.model('User', userSchema)

module.exports = User