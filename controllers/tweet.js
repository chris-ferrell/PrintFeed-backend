const express = require('express');
const Tweet = require('../models/tweet')
const isUserLoggedIn = require('../middleware/isLoggedIn');



const router = express.Router()

// middleware at the router level
router.use(isUserLoggedIn); // checkes to see if the user is logged in before accessing any of the tweet routes

// index 
router.get('/', async (req, res) => {
    try {
        const username = req.payload.username // the middleware is going to create the payload in the req object
        const tweets = await Tweet.find({username}) // returning all the tweets under one username
        res.json(tweets)
    } catch(error) {
        res.status(400).json({error})
    }
})

// show 
router.get('/:id', async (req, res) => {
    try {
        const username = req.payload.username 
        const tweets = await Tweet.findOne({username, _id:req.params.id});
        res.json(tweets)
    } catch(error) {
        res.status(400).json({error})
    }
})

// create
router.post('/', async (req, res) => {
    try {
        const username = req.payload.username;
        req.body.username = username;
        const note = await Tweet.create(req.body);
        res.json(note);
      } catch(error) {
        res.status(400).json({error: error.message})
    }
    
})

// update
router.put('/:id', async (req, res) => {
    try {
        const username = req.payload.username 
        req.body.username = username
        const tweets = await Tweet.findByIdAndUpdate(req.params.id, req.body , {new: true});
        res.json(tweets)
    } catch(error) {
        res.status(400).json({error})
    }
})

//  destroy 
router.delete('/:id', async (req, res) => {
    try {
        const username = req.payload.username 
        req.body.username = username
        const tweets = await Tweet.deleteOne({_id: req.params.id, username});
        res.json(tweets)
    } catch(error) {
        res.status(400).json({error})
    }
})

module.exports = router