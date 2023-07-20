const express  = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const authRouter = require('./controllers/auth')
const tweetRouter = require('./controllers/tweet');
// read .env file
dotenv.config();

//  create express app
const app = express()


// register middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials : true,
     // what the ip is allowed to do
})) // allow external request
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

// test route
app.get('/test', (req,res) => {
    res.send('server is working')
})
app.use('/auth', authRouter)
app.use('/tweet', tweetRouter)


const PORT = process.env.PORT || 4444
app.listen(PORT, () => {
    console.log(`🎧🔛🛜 ${PORT}`)
})