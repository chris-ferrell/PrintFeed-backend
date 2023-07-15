const mongoose = require('../db/connection');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false,
    },
    Author: {
        type: String,
        required: true
    },
});

const User = mongoose.model('tweet', tweetSchema);

module.exports = User;