const { UNAUTHORIZED, NOT_FOUND } = require("http-status");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

const auth = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization; // Bearer <token>

        const token = authorization.split(" ")[1];

        if (!token) {
            return res.status(UNAUTHORIZED).json({
                message: "Token is required",
                data: null,
                success: false,
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return res.status(NOT_FOUND).json({
                message: "User not found",
                data: null,
                success: false,
            });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(UNAUTHORIZED).json({
            message: error.message,
            data: null,
            success: false,
        });
    }
};

module.exports = auth;
