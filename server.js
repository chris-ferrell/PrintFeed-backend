const express  = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const authRouter = require('./controllers/auth')
// read .env file
dotenv.config();

//  create express app
const app = express()


// register middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

// test route
app.get('/test', (req,res) => {
    res.send('server is working')
})
app.use('/auth', authRouter)

const PORT = process.env.PORT || 4444
app.listen(PORT, () => {
    console.log(`🎧🔛🛜 ${PORT}`)
})