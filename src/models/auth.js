const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const router = require('../../routes/itaim')
mongoose.connect('mongodb://localhost/itcrud', {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema
//creating the user schema
const UserSchema = new Schema({
    name:{type:String, required:true},
    email:{type:String,required:true, unique : true},
    password:{type:String, required:true}
}, {timestamps:true}); 

const UserInfo = mongoose.model('User',UserSchema)
module.exports = UserInfo

