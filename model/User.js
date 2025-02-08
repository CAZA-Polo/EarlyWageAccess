const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String
    },
    middle_name: {
        type: String
    },
    last_name: {
        type: String
    },
    user_name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


// This will happen before adding to database
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();

    if(!validator.isStrongPassword(this.password)) {
        throw Error('Password not strong enough, please create another password')
    }

    if(this.password < 8) {
        throw Error('Password should be more than 8 characters');
    }

    this.password = await bcrypt.hash(this.password,salt);
    next();
});

// This will happen during logging in of user
userSchema.statics.login = async function(username,password) {
    const user = await this.findOne({ user_name: username, is_deleted: false });

    if(!user) {
        throw Error(`${username} does not exist`);
    }

    if(user) {
        const auth = await bcrypt.compare(password,user.password);
        if(auth) {
            return user;
        }
        throw Error('Password is incorrect');
    } 
    throw Error('This username doesn\'t exist');

}

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;