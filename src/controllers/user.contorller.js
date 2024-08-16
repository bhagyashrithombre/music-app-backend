const { CONFLICT, OK, CREATED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("http-status");
const UserModel = require("../models/User.model");
const bcrypt = require("bcrypt");
const generateAuthToken = require("../utils/generateAuthToken");

const register = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (user) {
            return res.status(CONFLICT).json({
                message: "Email already exist",
                data: null,
                success: false,
            });
        }

        req.body.password = await bcrypt.hashSync(req.body.password, 10);
        req.body.lastLoginAt = new Date();

        const doc = await UserModel.create(req.body);

        const token = generateAuthToken({ _id: doc._id });

        return res.status(CREATED).json({
            message: "Register successfully",
            data: { user: doc, token },
            success: true,
        });
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            message: error.message,
            data: null,
            success: false,
        });
    }
};

const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(BAD_REQUEST).json({
                message: "Incorrect email or password",
                data: null,
                success: false,
            });
        }

        const isPasswordMatch = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordMatch) {
            return res.status(BAD_REQUEST).json({
                message: "Incorrect email or password",
                data: null,
                success: false,
            });
        }

        user.lastLoginAt = new Date();
        await user.save();

        const token = generateAuthToken({ _id: user._id });

        return res.status(OK).json({
            message: "Login successully",
            data: { user, token },
            success: true,
        });
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            message: error.message,
            data: null,
            success: false,
        });
    }
};

const get = async (req, res) => {
    return res.status(OK).json({
        message: "",
        data: req.user,
        success: true,
    });
};

module.exports = { register, login, get };
