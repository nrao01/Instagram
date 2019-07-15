const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create schema
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
          text: {
            type: String,
            required: true
          },
          name: {
            type: String
          },
          avatar: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        
    }]
});

module.exports = Post = mongoose.model('posts', PostSchema);
