
const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    account_number: {
        type: Number,
        required:true,
        unique: true
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
    }, 
    account_balance: {
        type: Number,
        default: 0
    },
    salary_days: [{
        type: Number
    }],
    availment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'availment'
    },
    is_active: {
        type: Boolean,
        default: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


const AccountModel = mongoose.model('account', accountSchema);
module.exports = AccountModel;