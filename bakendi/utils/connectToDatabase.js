// bakendi/utils/connectToDatabase.js

const mongoose = require('mongoose');
const logger = require('./logger');

let isConnected = false;

const connectWithRetry = async (retries = 5, delay = 3000) => {
  while (retries > 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // 5 seconds
      });
      isConnected = mongoose.connection.readyState;
      logger.info('Connected to MongoDB successfully!');
      break;
    } catch (error) {
      logger.error(`MongoDB connection failed. Retries left: ${retries - 1}`, error);
      retries -= 1;
      if (retries === 0) {
        throw new Error('Unable to connect to MongoDB after multiple attempts.');
      }
      await new Promise(res => setTimeout(res, delay));
    }
  }
};

const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  await connectWithRetry();
};

module.exports = connectToDatabase;
