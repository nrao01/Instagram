const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create schema
const PostSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    photo: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    location: {
        type: String
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }],
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
});

module.exports = Post = mongoose.model('posts', PostSchema);
