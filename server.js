// import express from 'express';
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var connect=require('mongoose').connect
var authRoutes = require('./routes/auth.js')
// import cors from 'cors';
// import bodyParser from 'body-parser';


const app = express()
app.use(cors()) 
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/userDB", {

}).then(() =>console.log("MongoDB connected"))
.catch(err => console.log("MongoDb connection error:", err))

app.use('/', authRoutes)
app.listen(5005, () => {
  console.log('Server is running on http://localhost:5005')
})

mongoose.connection.once("open", () => {
  console.log("Connected DB:", mongoose.connection.name);
});