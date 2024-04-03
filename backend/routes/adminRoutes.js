const express = require('express');
const router = express.Router();
const multer = require('multer');
const adminController = require('../controllers/adminController');

const upload = multer({ dest: 'uploads/' });

router.route('/product').post(upload.single('file'), adminController.addProduct);

module.exports = router;