// bakendi/api/test.js

module.exports = (req, res) => {
  res.status(200).json({ success: true, message: "API is working!" });
};
