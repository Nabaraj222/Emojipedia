const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    utf8: {
        type:String,
        required: true
    },
    status: String
})

const emojiDb = mongoose.model('emoji', schema);

module.exports = emojiDb;