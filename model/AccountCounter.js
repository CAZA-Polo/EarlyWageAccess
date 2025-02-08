const mongoose = require('mongoose');

const accountCounterSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // The identifier, e.g., 'account'
    sequence_value: { type: Number, default: 1000 } // Starting point (adjust as needed)
});

const AccountCounterModel = mongoose.model('accountCounter', accountCounterSchema);
module.exports = AccountCounterModel;
