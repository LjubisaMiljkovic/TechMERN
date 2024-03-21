const express= require('express');
const router=express.Router();
const userController=require('../controllers/userConroller');

//*Register
//*=========
router.route('/register').post(userController.register);

//*Login
//*=========
router.route('/login').post(userController.login);


module.exports =router;