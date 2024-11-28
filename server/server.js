const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const plaid = require('plaid');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors(
    {
      origin: "http://localhost:3000",
  methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization"}
));

// Log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/paypal', paymentRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Handle favicon requests
app.get('/favicon.ico', (req, res) => res.status(204));

// Handle success after payment
app.get('/paypal/success', (req, res) => {
    res.send('Payment successful!');
});

// Handle canceled payment
app.get('/paypal/cancel', (req, res) => {
    res.send('Payment canceled!');
});

// Handle non-existing routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
