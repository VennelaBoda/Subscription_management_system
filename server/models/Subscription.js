const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 

    type: {
        type: String,
        required: true
    }, 

    price: {
        type: Number,
        required: true
    }, 

    startDate: {
        type: Date,
        default: Date.now
    }, 

    endDate: {
        type: Date,
        required: true
    },

    renewalCount: {
        type: Number,
        default: 0
    },
    
    status: {
        type: String,
        default: 'active'
    }, 
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
