const Account = require('../model/Account');
const AccountCounter = require('../model/AccountCounter');

module.exports.delete_accounts = async(req,res) => {
    try {
        await Account.deleteMany();
        await AccountCounter.deleteMany();
        res.status(200).json({ message: 'Accounts deleted' });
    } catch(err) {
        console.log(err);
    }
}