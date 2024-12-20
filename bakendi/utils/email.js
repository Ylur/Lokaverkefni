const nodemailer = require("nodemailer");

const EMAIL_SERVICE = process.env.EMAIL_SERVICE; // e.g., 'Gmail'
const EMAIL_USER = process.env.EMAIL_USER; // Your email address
const EMAIL_PASS = process.env.EMAIL_PASS; // Your email password or app-specific password
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000"; // Frontend URL

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

/**
 * Send Password Reset Email
 * @param {string} to - Recipient's email address
 * @param {string} token - Password reset token
 */
const sendResetEmail = async (to, token) => {
  const resetUrl = `${CLIENT_URL}/reset-password/${token}`;

  const mailOptions = {
    from: `"Your Restaurant" <${EMAIL_USER}>`, // Sender address
    to, // List of recipients
    subject: "Password Reset Request", // Subject line
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
${resetUrl}\n\n
If you did not request this, please ignore this email and your password will remain unchanged.\n`, // Plain text body
    html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
<p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
<a href="${resetUrl}">${resetUrl}</a>
<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`, // HTML body
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail };
