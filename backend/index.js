const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const AppError = require('./utils/AppError');

// * Controllers
const errorController = require('./controllers/errorController');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// * Ucitaj mi staticke fajlove
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// * Routes
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/product', productRoutes);

// * 404 error
app.all('*', (req, res, next) => {
    return next(new AppError(`Ova stranica ${req.originalUrl} ne postoji`, 404));
});

// * Global error handler middleware
app.use(errorController);

module.exports = app;