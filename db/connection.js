const dotenv = require('dotenv')
const mongoose = require('mongoose')
const { error } = require('selenium-webdriver')

dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL

mongoose.connect(DATABASE_URL) // connect to db 

// connection messages
mongoose.connection
.on('open', () => {console.log("Mongo is Connected")})
.on('close', () => {console.log("Mongo is disconnected")})
.on('error', (error) => {console.log(error)})


module.exports = mongoose;