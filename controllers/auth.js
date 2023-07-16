const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

// create router
const router = express.Router()

// signup post 
router.post('/signup', async (req, res) => {
    try{
    // hash password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))

    // generate the user
    const user = await User.create(req.body)

    // response
    res.json({status: "User Created"})
    } catch(error){
        res.status(400).json({ error })
    }
})

// login post
router.post('/login', async (req, res) => {
    try {
    const { username, password} = req.body
    // get the user
    const user = await User.findOne({username})

    if (user){
        const passwordCheck = await bcrypt.compare(password, user.password)
        if (passwordCheck){
            const payload = {username, userId: user._id}
            const token = jwt.sign(payload, process.env.SECRET)

            // res.cookie("token", token, {httpOnly: true}).json({payload, status: "logged in"})
            res.cookie("token", token, {
                httpOnly: true,
                path: "/",
                secure: req.hostname === "localhost" ? false : true, //if the the host is "localhost" send insecure cookies
            })
            .json({payload, status: "logged in"})

        } else {
            res.status(400).json({error: "password does not match "})
        }
    } else {
        res.status(400).json({error: "User does not exist "})
    }
  } catch(error) {
    res.status(400).json({ error });
  }
})

// logout post
router.post('/logout', async (req, res) => {
    res.clearCookie("token").json({ response: "You are Logged Out "})
})

module.exports = router 