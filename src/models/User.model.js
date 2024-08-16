const { Schema, model, models } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            private: true,
        },
        lastLoginAt: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true },
);

const UserModel = models["User"] || model("User", schema);

module.exports = UserModel;
