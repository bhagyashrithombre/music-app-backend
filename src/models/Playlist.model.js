const { Schema, model, models } = require("mongoose");

const schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        songs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Songs",
            },
        ],
    },
    { timestamps: true },
);

const PlaylistModel = models["Playlist"] || model("Playlist", schema);

module.exports = PlaylistModel;
