const Users = require('../models/userModel');
const AppError = require('../utils/AppError');
const Email = require('../utils/Email');
const cathcAsync = require('../utils/catchAsync');


//=================
//====*Register====
//=================
exports.register = cathcAsync(async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
        const newUser = new Users(req.body);
        const saveNewUser = await newUser.save();
        await new Email({ email: saveNewUser.email, username: saveNewUser.username }, 'http://localhost:5173/').sendWelcome();
        return res.status(200).json({
            status: 'success',
            message: 'User uspesno registrovan'
        });
    } else {
        return next(new AppError('Ovakav korisnik vec postoji', 409))
    }
});

//=================
//====*Login====
//=================

exports.login = cathcAsync(async (req, res, next) => {
    const user = await Users.findOne({ email: req.body.email });
    console.log(user, 'user');
    if (!user) {
        return next(new AppError('Ovakav korisnik ne postoji, molim registrujte se ponovo', 401))
    }
    if (user) {
        if (user.password === req.body.password) {
            return res.status(200).json({
                status: 'success',
                message: 'Uspesno ste se logovali'
            });
        } else {
            return next(new AppError('Netacni kredencijali', 401))
        }
    }
});