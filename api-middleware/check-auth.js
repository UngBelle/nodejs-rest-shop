module.exports = (res, res, next) => {
    try {
        const token = req.header.authorization.split("")[1];
        const decode = jwt.verify(token, req.body.token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (err) {
        return res.status(401).json ({
            message: 'Auth failed'
        })
    }
};