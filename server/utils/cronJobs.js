const cron = require('node-cron');
const UserSubscription = require('../models/UserSubscription');
const User = require('../models/User'); // Import the User model
const { sendEmail } = require('./mail'); // Import email utility

// Schedule a job to run at midnight every day to check for expired subscriptions
cron.schedule('0 0 * * *', async () => {
  try {
    const now = new Date();
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    // Find and update subscriptions that have expired
    const expiredSubscriptions = await UserSubscription.updateMany(
      { endDate: { $lt: now }, status: 'active' }, // Find expired subscriptions
      { $set: { status: 'expired' } }              // Set their status to 'expired'
    );

    // Log the number of subscriptions that have expired
    if (expiredSubscriptions.modifiedCount > 0) {
      console.log(`${expiredSubscriptions.modifiedCount} subscriptions have been marked as expired.`);
    } else {
      console.log('No subscriptions expired today.');
    }

    // Find subscriptions that will expire in the next 3 days
    const upcomingExpiry = await UserSubscription.find({
      endDate: { $gt: now, $lt: threeDaysFromNow }, // Expires within the next 3 days
      status: 'active',
    });

    // If there are any subscriptions expiring soon, send reminder emails
    if (upcomingExpiry.length > 0) {
      const userIds = upcomingExpiry.map(sub => sub.user);

      // Fetch all users related to the expiring subscriptions
      const users = await User.find({ _id: { $in: userIds } });

      // Create a map for quick lookup of user emails by user ID
      const userMap = {};
      users.forEach(user => {
        userMap[user._id] = user.email;
      });

      // Send reminder emails
      for (const subscription of upcomingExpiry) {
        const userEmail = userMap[subscription.user];

        if (userEmail) {
          const message = `Your subscription will expire on ${subscription.endDate.toDateString()}. Please renew it in time.`;
          sendEmail(userEmail, 'Subscription Expiry Reminder', message);
          console.log(`Sent reminder email to ${userEmail} about the upcoming expiration.`);
        } else {
          console.error(`User not found for subscription ID: ${subscription._id}`);
        }
      }
    } else {
      console.log('No subscriptions expiring in the next 3 days.');
    }

  } catch (err) {
    console.error('Error checking for expired subscriptions or sending reminders:', err.message);
  }
});
