const mongoose = require('mongoose');

const financialDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    transactionType: {
        type: String,
        enum: ['deposit', 'withdrawal', 'bet', 'win', 'loss'],
        required: true 
    }, 
    amount: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: Date,
        required: true
    }, 
},{
    timestamps:true
});

const financialDataModel = mongoose.model('FinancialData',financialDataSchema)

module.exports = financialDataModel