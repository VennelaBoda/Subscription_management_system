const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String, // URL for profile picture
        default: null,
    },
    bio: {
        type: String, // Short bio
        default: '',
    },
});

module.exports = mongoose.model('User', UserSchema);
