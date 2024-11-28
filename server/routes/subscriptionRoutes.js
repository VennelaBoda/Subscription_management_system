const express = require('express');
const { createPlan, subscribeUser, renewSubscription, cancelSubscription } = require('../controllers/subscriptionController');
const authenticateUser = require('../middleware/auth');  // Ensure this points to the correct file
const nodemailer = require('nodemailer');

const router = express.Router();

// Function to send email after cancellation
async function sendCancellationEmail(userEmail) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,  // Your email
            pass: process.env.EMAIL_PASSWORD  // Your email password
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Subscription Cancelled',
        text: 'Your subscription has been successfully cancelled.'
    };

    await transporter.sendMail(mailOptions);
    console.log("Cancellation email sent to:", userEmail);
}
// Create a new subscription plan
router.post('/create-plan', authenticateUser, createPlan);

// Subscribe a user to a plan
router.post('/subscribe', authenticateUser, subscribeUser);

// Renew a subscription
router.post('/renew', authenticateUser, renewSubscription);

// Cancel a subscription
router.delete('/cancel/:subscriptionId', authenticateUser, async (req, res) => {
    try {
        const { subscriptionId } = req.params;

        // Make sure user email is available
        console.log("User email:", req.user.email);  // Debugging to check if the email is properly attached
        if (!req.user.email) {
            return res.status(400).json({ msg: 'User email not found' });
        }

        // Call your existing cancelSubscription logic here
        await cancelSubscription(req, res);  // Assume this handles updating the subscription status
        
        // Send cancellation email
        await sendCancellationEmail(req.user.email);

        // No need to send another response after sending in cancelSubscription
    } catch (error) {
        console.error("Cancellation Error:", error.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;