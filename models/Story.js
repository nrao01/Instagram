const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create schema
const StorySchema = new Schema({

    username: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
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
    }]
});

module.exports = Story = mongoose.model('stories', StorySchema);
