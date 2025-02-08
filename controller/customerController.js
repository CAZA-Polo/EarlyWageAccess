const Customer = require('../model/Customer');
const mongoose = require('mongoose');
const serverErrorMessage = 'Internal server error, please try again';

module.exports.get_customers = async(req,res) => {

    try {
        const customers = await Customer.find({ is_deleted: false }).populate('employees');
        if(customers.length < 1) return res.status(200).json({ message: 'There are no customer records yet' });
        res.status(200).json(customers);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err })
    }
}

module.exports.get_customer = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: `Invalid ID format for mongodb: ${id}` });
    }

    try {   
        const customer = await Customer.findOne({ _id: id, is_deleted: false });
        if(!customer) return res.status(404).json({ message: `Customer with ID ${id} does not exist` });
        res.status(200).json(customer);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err })
    }
}

module.exports.add_customer = async(req,res) => {

    if(req.body.is_employer && !req.body.customer_name) {
        return res.status(400).json({ message: 'Customer name must be filled if the customer is an employer' })
    }

    try {
        const customer = await Customer.create(req.body);
        res.status(201).json({ message: `${customer.first_name} ${customer.last_name} has been added to customer record`, customer_id: customer._id });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err })
    }
}

module.exports.update_customer = async (req,res) => {
    const { id } = req.params;

    try {
        const customer = await Customer.findByIdAndUpdate(id, req.body);
        res.status(201).json({ message: `${customer.first_name} ${customer.last_name} has been updated successfully`, customer_id: customer._id });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err })
    }
}

module.exports.delete_customer = async (req,res) => {
    const { id } = req.params;

    try {
        const customer = await Customer.findByIdAndUpdate(id, { is_deleted: true });
        res.status(200).json({ message: `${customer.first_name} ${customer.last_name} has been deleted` });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err })
    }
}