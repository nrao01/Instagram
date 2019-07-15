const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
    caption : {
        type : String,
        required : false
    },
    avatar: {
        type: String
      },
    location : {
        type : String,
        required : false
    },
    date : {
        type : Date,
        default : Date.now
    },
    likes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
        }
      ],
    media : {
        type : String,
        required : true
    },
    
    comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
          text: {
            type: String,
            required: true
          },
          avatar: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ],
    tag : [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }]
});

module.exports = Post = mongoose.model('posts', PostSchema);