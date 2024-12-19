const express = require("express");
const URL = require("../models/url");
const router = express.Router();

// Home Route: Fetch all URLs and render the home page
router.get("/", async (req, res) => {
  try {
    const allURLs = await URL.find({});
    return res.render("home", {
      urls: allURLs,
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
