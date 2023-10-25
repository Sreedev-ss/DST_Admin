const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
},
    nation: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    lastLogin: {
        type: Date,
    },
    accountStatus: {
        type: String,
        enum: ['active', 'suspended', 'banned'],
        default: 'active'
    },
    balance: {
        type: Number,
        required: true
    },
    loginHistory: [{
        timestamp: {
            type: Date,
        },
        source: {
            type: String,
        },
    }],
    isAuthenticated: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

const userModel = mongoose.model('Users',userSchema);
module.exports = userModel;