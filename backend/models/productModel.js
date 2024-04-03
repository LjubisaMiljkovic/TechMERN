const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = Schema({
    title: {
        type: String,
        required: [true, 'Product title is required'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    image: {
        type: String,
        required: [true, 'Product image is required'],
    },
    rating: {
        type: Number,
        default: 0,
    },
    allRaitings: {
        type: Array,
    }

})

const ProductModel = mongoose.model('products', productSchema)
module.exports = ProductModel;