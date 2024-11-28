const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');  // Retrieve the token from the request header
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);  // Log the decoded token for debugging

        // Ensure that the decoded token has the user's email along with id
        req.user = {
            id: decoded.user.id,  // Attach user id to req
            email: decoded.user.email  // Attach user email to req
        };

        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token has expired' });
        }
        console.error("Token Verification Error:", err.message);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};