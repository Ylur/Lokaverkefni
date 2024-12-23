// bakendi/testConnection.js

require('dotenv').config();
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully!');
    process.exit(0);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectToDatabase();
