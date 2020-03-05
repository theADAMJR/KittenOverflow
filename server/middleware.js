const jwt = require('jsonwebtoken');

const middleware = {};

middleware.validateSelfUser = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const userId = jwt.decode(token)._id;
        return (userId === req.body._id) ? next() : res.status(401).send("Unauthorized");
    }
    catch { return res.status(400).send("Bad Request"); }
}

module.exports = middleware;