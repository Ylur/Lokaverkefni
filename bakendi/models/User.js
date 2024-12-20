

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10; // Number of salt rounds for bcrypt

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Removes whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Converts email to lowercase
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetPasswordToken: String,   // Token for password reset
    resetPasswordExpires: Date,   // Expiration time for reset token
}, { timestamps: true });

// Pre-save hook to hash passwords before saving
UserSchema.pre('save', async function (next) {
    const user = this;

    // Only hash the password if it has been modified or is new
    if (!user.isModified('password')) return next();

    try {
        // Generate salt
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        // Hash the password using the generated salt
        const hash = await bcrypt.hash(user.password, salt);
        // Replace the plaintext password with the hashed one
        user.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare candidate password with stored hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
