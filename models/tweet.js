const mongoose = require('../db/connection');

const tweetSchema = new mongoose.Schema({
   content: String,
   image: String,
   username: String,
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true, }, //mongo document _id
   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // list of user objects who liked tweet
}, {timestamps: true});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;