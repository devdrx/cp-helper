const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authcheck');

// Load environment variables
require('dotenv').config();


router.get('/userInfo', authMiddleware, async(req, res)=>{
    const userId = req.user._id;
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user info', error });
    }
})

// POST /signup
router.post('/signup', async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// POST /login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Return token and user (without password)
        const { password: _, ...userData } = user.toObject();

        res.status(200).json({
            message: 'Login successful',
            token,
            user: userData
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

router.post('/linkCfId', authMiddleware, async (req, res) => {
    const { cf_id } = req.body;
    const userId = req.user._id;
  
    console.log("hi");
    try {
      console.log("hi3");
      // First, verify the handle via Codeforces API
      const response = await fetch(`https://codeforces.com/api/user.info?handles=sarthak_nayyar&checkHistoricHandles=false`);
      const userInfo = await response.json();
      console.log(userInfo);

      
      if (userInfo.status !== 'OK') {
          return res.status(400).json({ message: 'Invalid Codeforces ID' });
        }
        
        // If valid, update in database
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        // console.log("hi3");
        
        user.codeforcesHandle = cf_id;
        user.cfCurrentRating = userInfo.result[0].rating;
        user.cfCurrentRank = userInfo.result[0].rank;
        user.cfHighestRating = userInfo.result[0].maxRating;
        user.cfHighestRank = userInfo.result[0].maxRank;
        user.cfFriends = userInfo.result[0].friendOfCount;
        await user.save();
        
        res.status(200).json({
            message: 'Codeforces ID verified and updated successfully',
            user,
            cfInfo: userInfo.result[0]
        });
        console.log("hi4");
  
    } catch (error) {
      res.status(500).json({ message: 'Failed to link Codeforces ID', error: error.message });
    }
  });
                         

module.exports = router;
