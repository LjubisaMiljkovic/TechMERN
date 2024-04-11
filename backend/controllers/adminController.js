const Product = require('../models/productModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.addProduct = catchAsync(async (req, res, next) => {
    const productData = JSON.parse(req.body.product);

    if (req.file) productData.image = req.file.filename;
    else return next(new AppError('Slika proizvoda je obavezna', 404));

    const newProduct = new Product(productData);
    await newProduct.save();

    res.status(200).json({
        status: 'success',
        message: 'Uspesno dodat proizvod',

    });
});