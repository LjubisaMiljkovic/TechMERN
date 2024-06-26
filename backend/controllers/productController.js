const Products = require('../models/productModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Products.find();
    if (products.length > 0) {
        res.status(200).json({
            status: 'success',
            products,
        });
    } else {
        return next(new AppError('Nemate ni jedan proizvod', 404));
    }
});

exports.getSingleProduct = catchAsync(async (req, res, next) => {
    const product = await Products.findById(req.params.productID);
    if (product) {
        res.status(200).json({
            status: 'success',
            product,
        });
    } else return next(new AppError('Ovakav proizvod ne postoji', 404));
});