const User = require('../model/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const maxAge = 3 * 24 * 24 * 60;
const createToken = (token) => {
    return jwt.sign({ token }, process.env.JWT_SECRET,{
        expiresIn: maxAge
    })
};

const serverErrorMessage = 'Internal server error, please try again';

// Get all users
module.exports.get_users = async (req,res) => {
    try {
        const users = await User.find({ is_deleted: false });
        if(users.length < 1) return res.status(200).json({ message: 'There are no user records yet' });
        res.status(200).json(users);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err })
    }
}

// get particular user
module.exports.get_user = async(req,res) => {
    const { id } = req.params;

    // Check if the id is a valid MongoDB ObjectId
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: `Invalid ID format for mongodb: ${id}` });
    }
    
    try {
        const user = await User.findOne({ _id: id, is_deleted: false });
        if(!user) return res.status(404).json({ message: `User with ID ${id} does not exist` });
        res.status(200).json(user);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err })
    }
}

module.exports.user_signup = async (req,res) => {
    const { first_name, middle_name, last_name, user_name, user_role, password, confirm_password } = req.body;

    if(password !== confirm_password) return res.status(400).json({ message: 'Password does not match, please try again' })

    try {
        const user = await User.create({ first_name,middle_name,last_name,user_name,password });
        const token = createToken(user._id);

        res.status(201).json({ message: `${user_name} has been added successfully`, user_token: token });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err  })
    }
}

module.exports.user_login = async (req,res) => {
    // Login functionality here
    const { user_name, password } = req.body;

    try {
        const user = await User.login(user_name,password);
        const token = createToken(user._id);
        res.status(200).json({ message: `Welcome ${user_name}, login successful`, user_token: token });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err  })
    }
}

module.exports.user_update = async (req,res) => {
    
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, req.body);
        res.status(201).json({ message: `${user.user_name} has been updated successfully` });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err  })
    }
}

module.exports.user_delete = async (req,res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, { is_deleted: true });
        res.status(200).json({ message: `${user.user_name} has been deleted` });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err  })
    }
}