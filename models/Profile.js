const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    bio: {
        type: String
    },
    website: {
        type: String
    },
    following: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    followers: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }  
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    }],
    story: {
        type: String
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
