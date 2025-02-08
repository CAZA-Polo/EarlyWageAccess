const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({

}, { timestamps: true })

const HolidayModel = mongoose.model('holiday', holidaySchema);
module.exports = HolidayModel;