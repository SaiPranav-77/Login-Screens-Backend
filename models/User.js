// import {Schema, model} from "mongoose";
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var model = mongoose.model;

const userSchema = new Schema({
    firstName:String,
    lastName:String,
    gender:String,
    dob:Date,
    email:{type:String, unique:true},
    phone:String,
    password:String,

})
// export default model('User', userSchema);
module.exports = model('User', userSchema);