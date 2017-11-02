const UserServices = require('service/UserService');

module.exports.authorized = (req, res, next) => {
    if(!(req.cookies || {}).token) {
        return res.status(401).json('You are unauthorize');
    }
    return UserServices.getUserIdByToken(req.cookies.token)
        .then((userId) => {
            req.userId = userId;
            next();
        })
};