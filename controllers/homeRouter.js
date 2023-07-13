const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.get('/', async (req, res) => {
    const allpost = await Post.find({});
    res.render(
        '../views/landing.ejs',
        {
            allpost
        }
        );
})
const postController = require('./postRouter');
console.log('Mounting postController to /posts route');
router.use('/posts', postController);

// const userController = require('./userRouting');
// console.log('Mouting userController to /create route');
// router.use('/user', userController);

const communityController = require('./communityRouter');
console.log('Mounting communityRouter to /community route');
router.use('/community', communityController);


module.exports = router;