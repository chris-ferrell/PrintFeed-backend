const mongoose = require('../db/connection');

const tweetSchema = new mongoose.Schema({
   content: String,
   image: String,
   username: String,
   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //mongo document _id
   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, {timestamps: true});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;