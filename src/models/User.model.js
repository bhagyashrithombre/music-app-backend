const { Schema, model, models } = require("mongoose");

const schema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
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
