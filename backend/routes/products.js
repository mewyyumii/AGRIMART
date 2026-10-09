const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all products (Marketplace)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ date: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Get products by specific farmer
router.get('/farmer', auth, async (req, res) => {
    try {
        const products = await Product.find({ farmer: req.user.id });
        res.json(products);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add new product (Farmer only)
router.post('/', auth, async (req, res) => {
    try {
        if(req.user.role !== 'farmer') return res.status(403).json({msg: 'Not authorized'});
        
        const { name, price, unit, quantityInStock } = req.body;
        const newProduct = new Product({
            farmer: req.user.id,
            farmerName: req.user.name,
            name, price, unit, quantityInStock
        });
        
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
