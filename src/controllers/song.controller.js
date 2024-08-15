const { CONFLICT, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR, OK } = require("http-status");
const SongModel = require("../models/Songs.model");
const PlaylistModel = require("../models/Playlist.model");

const create = async (req, res) => {
    try {
        const song = await SongModel.findOne({ name: req.body.name });

        if (song) {
            return res.status(CONFLICT).json({
                message: "Song with name already exist",
                data: null,
                success: false,
            });
        }

        const playlist = await PlaylistModel.findById(req.body.playlistId);

        if (!playlist) {
            return res.status(NOT_FOUND).json({
                message: "Playlist does not exist",
                data: null,
                success: false,
            });
        }

        if (playlist.userId.toString() !== req.user._id.toString()) {
            return res.status(NOT_FOUND).json({
                message: "Invalid playlist",
                data: null,
                success: false,
            });
        }

        const doc = await SongModel.create(req.body);

        return res.status(CREATED).json({
            message: "Song added to playlist",
            data: doc,
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

const getAll = async (req, res) => {
    try {
        const docs = await SongModel.find();

        return res.status(OK).json({
            message: "",
            data: docs,
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

const getByPlaylist = async (req, res) => {
    try {
        const docs = await SongModel.find({ playlistId: req.params.playlistId });

        return res.status(OK).json({
            message: "",
            data: docs,
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
    try {
        const doc = await SongModel.findById(req.params.songId);

        return res.status(OK).json({
            message: "",
            data: doc,
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

module.exports = { create, getAll, getByPlaylist, get };
