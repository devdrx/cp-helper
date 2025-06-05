const express = require("express");
const router = express.Router();
const { fetchRecentContests, fetchUpcomingContests } = require('@qatadaazzeh/atcoder-api');

router.get("/", async (req, res) => {
  try {
    const recent = await fetchRecentContests();
    const upcoming = await fetchUpcomingContests();
    const all = [...recent, ...upcoming].sort(
      (a, b) => new Date(b.start_time) - new Date(a.start_time)
    );
    res.json(all.slice(0, 10));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch AtCoder contests" });
  }
});

module.exports = router;
