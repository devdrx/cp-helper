const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authcheck');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');


// Load environment variables
require('dotenv').config();


router.get('/userInfo', authMiddleware, async (req, res) => {
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


async function getLeetcodeStats(username) {
    let totalProblems = 0;
    let totalContests = 0;

    // for (const username of usernames) {
    try {
        const solvedRes = await axios.get(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
        const contestRes = await axios.get(`https://alfa-leetcode-api.onrender.com/${username}/contest`);

        totalProblems = solvedRes.data.solvedProblem;
        console.log(solvedRes.data);
        // totalContests = contestRes.data.contestCount ;

    } catch (err) {
        console.error(`LeetCode error for ${username}:`, err.message);
    }
    // }

    return { problemsSolved: totalProblems };
}



const getCodeChefStats = async (usernames) => {
    let totalSolved = 0;

    // Ensure we have an array of usernames
    const users = Array.isArray(usernames) ? usernames : [usernames];

    for (let username of users) {
        try {
            // Fetch the user profile HTML
            const { data: html } = await axios.get(
                `https://www.codechef.com/users/${username}`
            );

            // Load into Cheerio
            const $ = cheerio.load(html);
            const solvedHeader = $('h3')
                .filter((i, el) => {
                    return $(el).text().trim().startsWith('Total Problems Solved');
                })
                .first()
                .text()
                .trim();
            const matchSolved = solvedHeader.match(/Total Problems Solved:\s*(\d+)/i);
            if (matchSolved && matchSolved[1]) {
                totalSolved += parseInt(matchSolved[1], 10);
            } else {
                console.warn(`Could not parse solved count for CodeChef user "${username}".`);
            }

        } catch (err) {
            console.error(`Error fetching CodeChef data for "${username}":`, err.message);
        }
    }

    return { solvedCount: totalSolved /*, contestsCount: totalContests */ };
};

router.post('/multiverse', async (req, res) => {
    console.log("hi2");
    const { codeforces, codechef, leetcode } = req.body; // Extract IDs from request body
    // const codeforces = cfid || null; // Codeforces ID
    // const codechef = ccid || null; // CodeChef ID
    const lcid = leetcode; // LeetCode ID
    console.log(codeforces, codechef, lcid);
    console.log(req.body);

    try {
        const stats = {};

        // CODEFORCES: Fetch submissions and count unique solved problems
        if (codeforces) {
            let solvedProblems = new Set();

            for (let handle of Array.isArray(codeforces) ? codeforces : [codeforces]) {
                console.log("hi");
                const { data } = await axios.get(
                    `https://codeforces.com/api/user.status?handle=${handle}`
                );

                if (data.status === 'OK') {
                    for (const submission of data.result) {
                        if (submission.verdict === 'OK') {
                            const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
                            solvedProblems.add(problemKey);
                        }
                    }
                }
            }

            stats.codeforces = {
                solvedCount: solvedProblems.size,
            };

        }
        if (codechef) {
            stats.codechef = await getCodeChefStats(codechef);
        }
        if (lcid) {
            stats.leetcode = await getLeetcodeStats(lcid);
        }

        //   res.json(stats);
        res.status(200).json(stats);
    } catch (error) {
        console.error('Error fetching stats:', error.message);
        res.status(400).json({ error: 'Failed to fetch stats' });
    }

});


module.exports = router;
