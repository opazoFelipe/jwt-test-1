const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const config = require('../config');

const controller = {};

controller.signup = async (req, res, next) => {
    const { username,  email, password } = req.body;
    const newUser = new User({username, email, password});
    newUser.password = await newUser.encryptPassword(newUser.password);
    await newUser.save();

    const token = jwt.sign({id: newUser._id}, config.secret, {
        expiresIn: 60 * 60 * 24
    });

    res.json({auth: true, token});
}

controller.signin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(404).send("Email doesn't exist");
    else {
        const validPassword = await user.comparePassword(password);
        if(!validPassword) return res.status(404).json({auth:false, token: null});
        else {
            const token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 60 * 60 * 24
            });
            res.json({auth: true, token});
        }
    }      
}

controller.profile = async (req, res, next) => {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(404).send('No user found');
    } else {
        res.status(200).json({
            auth: true,
            message: 'Welcome, You can access to the information',
            user
        });
    }
}


module.exports = controller;