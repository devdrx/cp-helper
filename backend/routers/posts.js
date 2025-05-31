const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const authMiddleware = require('../middlewares/authcheck'); // import middleware

// Create a new post (🔒 Protected route)
router.post('/', authMiddleware, async (req, res) => {
    const { title, content, tags, contestID, contestName, problemID, problemName } = req.body;
    try {
        const newPost = new Post({
            by: req.user._id, // Automatically taken from token
            title,
            content,
            tags,
            contestID,
            contestName,
            problemID,
            problemName,
            createdAt: new Date(),
            comments: [],
            likes: [],
            dislikes: []
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

router.get("/grouped-by-problem", async (req, res) => {
    try {
      const groupedBlogs = await Post.aggregate([
        {
          $group: {
            _id: {
              problemName: "$problemName",
            //   console.log(problem.problemId),
            //   name: "$problem.name",
            //   contestId: "$problem.contestId"
            },
            blogs: { $push: "$$ROOT" },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 } // Optional: sort by number of blogs
        }
      ]);
  
      res.json(groupedBlogs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  });

module.exports = router;
