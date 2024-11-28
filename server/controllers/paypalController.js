const paypal = require('@paypal/checkout-server-sdk');
const paypalClient = require('../config/paypalConfig');
const { sendEmail } = require('../utils/mail'); 
const Payment = require('../models/Payment'); // Ensure you have a Payment model

// Create PayPal order
const createPayment = async (req, res) => {
    const { value } = req.body;

    // Validate value
    if (!value || isNaN(value) || Number(value) <= 0) {
        return res.status(400).json({ message: 'Invalid payment amount' });
    }

    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: (parseFloat(value) || 10.00).toFixed(2)
            }
        }],
        application_context: {
            return_url: 'http://localhost:5000/paypal/success',
            cancel_url: 'http://localhost:5000/paypal/cancel'
        }
    });

    try {
        const order = await paypalClient.client.execute(request);
        res.json(order.result);
    } catch (err) {
        console.error('Error creating PayPal order:', err.message);
        res.status(500).json({ message: 'Error creating PayPal order', error: err.message });
    }
};

// Capture PayPal order
const capturePayment = async (req, res) => {
    const { orderID, email } = req.body;

    if (!orderID || !email) {
        return res.status(400).json({ message: 'Order ID and email are required' });
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderID);

    try {
        const capture = await paypalClient.client.execute(request);

        const subject = 'Payment Confirmation';
        const text = `Thank you for your payment! Your order ID is ${orderID} and the amount charged is ${capture.result.purchase_units[0].payments.captures[0].amount.value} ${capture.result.purchase_units[0].payments.captures[0].amount.currency_code}.`;

        await sendEmail(email, subject, text);

        const payment = new Payment({
            orderID,
            email,
            amount: parseFloat(capture.result.purchase_units[0].payments.captures[0].amount.value),
            currency: capture.result.purchase_units[0].payments.captures[0].amount.currency_code,
            status: 'COMPLETED',
        });

        await payment.save();

        res.json(capture.result);
    } catch (err) {
        console.error('Error capturing PayPal payment:', err.message);
        res.status(500).json({ message: 'Error capturing PayPal payment', error: err.message });

        const payment = new Payment({
            orderID,
            email,
            amount: 0,
            currency: 'USD',
            status: 'FAILED',
        });

        await payment.save();
    }
};

module.exports = { createPayment, capturePayment };
