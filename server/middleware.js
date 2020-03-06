const jwt = require('jsonwebtoken'),
      User = require('./models/user');

const middleware = {};

middleware.validateOwner = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const userId = jwt.decode(token)._id;
        return (userId === req.body._id) ? next() : res.status(401).send('Unauthorized');
    }
    catch { return res.status(400).send('Bad Request'); }
}

middleware.validateUser = async(req, res, next) => {
    try {
        const token = req.headers.authorization;        
        const userId = jwt.decode(token)._id;

        res.locals.user = await User.findById(userId);

        return next();
    } catch {
        res.status(401).send('Unauthorized');
    }
}

middleware.validateModerator = async(req, res, next) => next();

module.exports = middleware;