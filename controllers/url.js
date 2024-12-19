const shortid = require("shortid");
const URL = require("../models/url");

const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;
  
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid.generate();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render('home', {
    id: shortID
  })
 
};

const handleAnalytics = async (req, res) => {
  const shortId = req.params.shortID;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateNewShortURL,
  handleAnalytics,
};
