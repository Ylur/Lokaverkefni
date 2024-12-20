// bakendi/utils/uuidGenerator.js

const { v4: uuidv4 } = require('uuid');

/**
 * Generates a new UUID.
 * @returns {string} A new UUID.
 */
function generateUUID() {
    return uuidv4();
}

module.exports = generateUUID;
