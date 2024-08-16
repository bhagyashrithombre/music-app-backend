const { Schema, model, models } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const SongModel = models["Songs"] || model("Songs", schema);

module.exports = SongModel;
