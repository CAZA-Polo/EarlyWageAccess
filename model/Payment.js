const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    payment_date: {
        type: Date,
        default: new Date()
    },
    payment_amount: {
        type: Number,
    }
})

const PaymentModel = mongoose.model('payment', paymentSchema);
module.exports = PaymentModel;