const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    late_payment_fee: {
        type: Number
    },
    loan_due_date: {
        type: Date
    },
    account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'account'
    },
    availment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'availment'
    },
    payment_id:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment'
    }
}, { timestamps: true })

const CollectionModel = mongoose.model('collection', collectionSchema);
module.exports = CollectionModel;