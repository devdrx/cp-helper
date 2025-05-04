const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const authMiddleware = require('../middlewares/authcheck'); // import middleware

// Create a new post (🔒 Protected route)
router.post('/', authMiddleware, async (req, res) => {
    const { title, content, tags } = req.body;
    try {
        const newPost = new Post({
            by: req.user._id, // Automatically taken from token
            title,
            content,
            tags
        });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
});

// Get all posts (public)
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('by', 'name email');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
});

module.exports = router;
