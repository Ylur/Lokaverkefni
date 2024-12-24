// tekur stöðuna á server + mongoDB
// klárt

const connectToDatabase = require("../utils/connectToDatabase");

module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    return res.status(200).json({ success: true, message: "API is working and DB is connected!" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.toString() });
  }
};
