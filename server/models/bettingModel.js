const mongoose = require('mongoose');
const User = require('./userModel');


const bettingSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    odds: {
        type: Number,
        required: true,
    },
    selectedOutcome: {
        type: String,
        required: true,
    },
    nation: {
        type: String,
        required: true,
    },
    timeRemaining: {
        type: String,
    },
    eventType: {
        type: String,
        required: true,
    },
    isWin: {
        type: Boolean,
        default: false,
    },
    associatedFinancialTransaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FinancialData', 
    },
},{
    timestamps: true
});

const BettingSession = mongoose.model('BettingSession', bettingSessionSchema);

module.exports = BettingSession;