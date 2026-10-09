const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    farmerName: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    quantityInStock: { type: Number, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Product', ProductSchema);
