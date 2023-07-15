const mongoose = require('../db/connection');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;