const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const authMiddleware = require('../middlewares/authcheck'); // import middleware

// Create a new post (🔒 Protected route)
router.post('/', authMiddleware, async (req, res) => {
    const { title, content, tags, contestID, contestName, problemID, problemName } = req.body;
    // console.log("Request body:", req.user);
    // console.log("Request body:", req.user.userName);
    try {
      const newPost = new Post({
            by: req.user._id, // Automatically taken from token
            author: req.user.userName, // Automatically taken from token
            title,
            content,
            tags,
            contestID,
            contestName,
            problemIndex: req.body.problemIndex, // Assuming problemIndex is passed in the request body
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

router.get("/blog/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('by', 'name email');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
}
);

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


  router.put('/like/:id', authMiddleware, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const userId = req.user.id;
  
      if (post.likes.includes(userId)) {
        post.likes.pull(userId); // Remove like
      } else {
        post.likes.push(userId);
        post.dislikes.pull(userId); // Remove dislike if present
      }
  
      await post.save();
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: 'Failed to like the post' });
    }
  });
  
  // 👎 Dislike / Undislike
  router.put('/dislike/:id', authMiddleware, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const userId = req.user.id;
  
      if (post.dislikes.includes(userId)) {
        post.dislikes.pull(userId); // Remove dislike
      } else {
        post.dislikes.push(userId);
        post.likes.pull(userId); // Remove like if present
      }
  
      await post.save();
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: 'Failed to dislike the post' });
    }
  });
  
  // 💬 Add Comment
  router.post('/comment/:id', authMiddleware, async (req, res) => {
    try {
      const { content } = req.body;
      const post = await Post.findById(req.params.id);
  
      post.comments.push({
        by: req.user.id,
        content,
      });
  
      await post.save();
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: 'Failed to add comment' });
    }
  });

module.exports = router;
