const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    problemID:{
        type: String
    },
    problemName: {
        type: String
    },
    problemIndex: {
        type: String, // e.g., "A", "B", "C", etc.
        required: true, // Assuming problemIndex is always required
    },
    contestID: {
        type: String
    },
    contestName: {
        type: String
    },

    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    comments: [
        {
            by: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    tags: [
        {
            type: String,
        },
    ],
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
