const Collection = require('../model/Collection');

const serverErrorMessage = 'Internal server error, please try again';

module.exports.get_collections = async (req,res) => {
    try {
        const collections = await Collection.find().populate('account_id availment_id payment_id');
        if(collections.length < 1) return res.status(404).json({ messsage: 'No collections has been made yet' });
        res.status(200).json(collections);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: err.message || serverErrorMessage, error: err });
    }
}