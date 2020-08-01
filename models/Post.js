const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    id: {type: String, required: true},
    author: {type: String, required: true},
    title: {type: String, required: true},
    message: {type: String, required: true},
    psdate: {type: Date, default: Date.now}
});

const postmodole = mongoose.model('Post', PostSchema);
module.exports = postmodole;