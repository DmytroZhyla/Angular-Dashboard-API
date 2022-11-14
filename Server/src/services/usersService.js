const {User} = require("../models/Users.js");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
    const {email, password, name} = req.body;
    if ( email === undefined || password === undefined || name === undefined) {
        res.status(400).json({message: 'please check your request'})
        return
    }
    const user = new User({
        email,
        password: await bcryptjs.hash(password, 10),
        name
    });
    user.save()
        .then(() => res.json({message: req.body}))
        .catch(err => {
            next(err);
        });
}

const loginUser = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).json('Unregistered user')
    }
    if (user && await bcryptjs.compare(String(req.body.password), String(user.password))) {
        const payload = {email: user.email, userId: user._id, name: user.name}
        const jwtToken = jwt.sign(payload, 'secret-jwt-key');
        return res.json({
            jwt_token: jwtToken,
            name: payload.name
        });
        return res.status(400).json({'message': 'Not authorized'});
    }
}


module.exports = {
    registerUser,
    loginUser,
};
