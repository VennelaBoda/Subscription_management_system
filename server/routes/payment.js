const express = require('express');
const router = express.Router();
const { createPayment, capturePayment } = require('../controllers/paypalController');

// Route to create payment
router.post('/create-payment', createPayment);

// Route to capture payment
router.post('/capture-payment', capturePayment);

module.exports = router;
