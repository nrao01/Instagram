const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create schema
const ProfileSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    bio: {
        type: String
    },
    website: {
        type: String
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    story: {
        type: String
    }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);
