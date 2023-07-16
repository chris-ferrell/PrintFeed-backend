const express = require('express');
const Tweet = require('../models/tweet')
const isUserLoggedIn = require('../middleware/isLoggedIn');
const User = require('../models/user');



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
    console.log('*********** Reached create tweet route ************') // 
    console.log(req.body)
    console.log('payload ' , req.payload)
    try {
        const username = req.payload.username;
        req.body.username = username;
        const newTweet = req.body
        newTweet.user = req.payload.userId
        const tweet = await Tweet.create(newTweet);
    
        const user = await User.findById(req.payload.userId)
        console.log(user)
        user.tweets.push(tweet._id);
        await user.save(); // saves upstream 

        // res.json(tweet);
        res.json("ok ..")
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

router.patch('/:tweetId/like', async (req, res) => {
    console.log('*********** Reached like tweet route ************');
    try {
      const tweetId = req.params.tweetId;
      const userId = req.payload.userId;
  
      const tweet = await Tweet.findById(tweetId);
      if (!tweet) {
        return res.status(404).json({ error: 'Tweet not found' });
      }
  
      const likedIndex = tweet.likes.findIndex((like) => like.toString() === userId);
      if (likedIndex !== -1) {
        // User has already liked the tweet, remove the like
        tweet.likes.splice(likedIndex, 1);
      } else {
        // User has not liked the tweet, add the like
        tweet.likes.push(userId);
      }
  
      await tweet.save();
  
      res.json({ message: 'Tweet like updated successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

module.exports = router