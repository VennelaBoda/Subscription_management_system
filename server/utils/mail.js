const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();  // Load environment variables from .env file

// Setup your email service (Gmail in this case)
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,       // Use environment variable for your email
    pass: process.env.EMAIL_PASSWORD, // Use environment variable for your password
  },
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,        // Use environment variable for your email
    to,                              // Receiver's email
    subject,                         // Email subject
    text,                            // Email content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return true;  // Return true if email sent successfully
  } catch (err) {
    console.error('Error sending email:', err);
    return false; // Return false if there was an error
  }
};

module.exports = { sendEmail };
