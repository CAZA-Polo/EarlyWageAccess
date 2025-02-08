const mongoose = require('mongoose');

const availmentSchema = new mongoose.Schema({
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    availment_amount: {
        type: Number,
        required: true
    },
    loan_date: {
        type: Date,
        default: new Date()
    },
    loan_due_date: {
        type: Date,
        default: new Date()
    },
    is_paid: {
        type: Boolean,
        default: false
    },
    remaining_balance: { // Might be availment amount + the charge fee
        type: Number
    },
    late_payment_fee: {
        type: Number,
    },
    payment_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment'  
    }],
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const AvailmentModel = mongoose.model('availment', availmentSchema);
module.exports = AvailmentModel;