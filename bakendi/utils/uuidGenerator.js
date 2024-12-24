// bakendi/utils/uuidGenerator.js
// klárt fyrir serverless

const { v4: uuidv4 } = require("uuid");

/**
 * Generate a UUID v4
 * @returns {string} UUID
 */
const generateUUID = () => {
  return uuidv4();
};

module.exports = { generateUUID };
