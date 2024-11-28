const SubscriptionPlan = require('../models/SubscriptionPlan');
const UserSubscription = require('../models/UserSubscription');
const { capturePayment } = require('./paypalController');  // Correct import
const { sendEmail } = require('../utils/mail');

// Create a subscription plan
const createPlan = async (req, res) => {
  try {
    const { name, price, duration, features} = req.body;
    const newPlan = new SubscriptionPlan({ name, price, duration, features });
    await newPlan.save();
    res.status(201).json({ message: 'Subscription plan created', plan: newPlan });
  } catch (err) {
    res.status(500).json({ message: 'Error creating subscription plan', error: err.message });
  }
};

// Subscribe user to a plan
const subscribeUser = async (req, res) => {
  try {
    const { planId, userId } = req.body;
    const plan = await SubscriptionPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Plan not found' });

    const subscription = new UserSubscription({
      user: userId,
      plan: planId,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default 30 days
      status: 'active' // Ensure status is set to active on subscription creation
    });

    await subscription.save();
    res.status(201).json({ message: 'User subscribed successfully', subscription });
  } catch (err) {
    res.status(500).json({ message: 'Error subscribing user', error: err.message });
  }
};

// Renew Subscription
const renewSubscription = async (req, res) => {
  console.log("Received body:", req.body);

  try {
    const { subscriptionId, orderID } = req.body || {};
    if (!subscriptionId || !orderID) {
      console.log("Missing subscriptionId or orderID");
      return res.status(400).json({ message: 'Subscription ID and PayPal Order ID are required' });
    }

    const subscription = await UserSubscription.findById(subscriptionId);
    if (!subscription) {
      console.log(`Subscription not found. ID: ${subscriptionId}`);
      return res.status(404).json({ message: 'Subscription not found' });
    }

    if (subscription.status !== 'active') {
      console.log(`Subscription is not active. Status: ${subscription.status}`);
      return res.status(400).json({ message: 'Subscription is not active' });
    }

    const captureResult = await capturePayment({ orderID: orderID, email: req.user.email });
    console.log("Capture result from PayPal:", captureResult);

    if (!captureResult || captureResult.status !== 'COMPLETED') {
      console.log("Payment not completed. Capture result:", captureResult);
      return res.status(400).json({ message: 'Payment not completed' });
    }

    const currentEndDate = subscription.endDate;
    const newEndDate = new Date(currentEndDate);
    newEndDate.setDate(newEndDate.getDate() + 30);

    console.log("Old End Date:", currentEndDate);
    console.log("New End Date:", newEndDate);

    subscription.endDate = newEndDate;
    subscription.renewalCount = (subscription.renewalCount || 0) + 1;

    await subscription.save();

    console.log("Subscription renewed successfully:", subscription);

    res.status(200).json({ message: 'Subscription renewed successfully', subscription });
  } catch (err) {
    console.error("Error renewing subscription:", err);
    res.status(500).json({ message: 'Error renewing subscription', error: err.message });
  }
};

// Cancel subscription
const cancelSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.subscriptionId;
    const subscription = await UserSubscription.findById(subscriptionId);
    if (!subscription) return res.status(404).json({ message: 'Subscription not found' });

    // Update subscription status to canceled
    subscription.status = 'canceled';
    await subscription.save();

    console.log("User email:", req.user.email);

    // Send cancellation email to the user
    const emailSent = await sendEmail(
      req.user.email, // Use the authenticated user's email
      'Subscription Canceled',
      `Your subscription has been canceled. Your plan was: ${subscription.plan}`
    );

    if (!emailSent) {
      return res.status(500).json({ message: 'Error sending cancellation email' });
    }

    res.status(200).json({ message: 'Subscription canceled successfully', subscription });
  } catch (err) {
    res.status(500).json({ message: 'Error canceling subscription', error: err.message });
  }
};

module.exports = { createPlan, subscribeUser, renewSubscription, cancelSubscription };