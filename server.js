const express  = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config();

const app = express()


// middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// test route
app.get('/test', (req,res) => {
    res.send('server is working')
})

const PORT = process.env.PORT || 4444
app.listen(PORT, () => {
    console.log(`🎧🔛🛜 ${PORT}`)
})