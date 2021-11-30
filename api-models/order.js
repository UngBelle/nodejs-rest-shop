const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', require: true}, //ref '' is the name of the schema that you want to connect
    quantity: {type: Number, default: 1}
});

module.exports = mongoose.model('Order', orderSchema);