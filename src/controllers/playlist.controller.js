const { CONFLICT, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR, OK } = require("http-status");
const PlaylistModel = require("../models/Playlist.model");

const create = async (req, res) => {
    try {
        const playlist = await PlaylistModel.findOne({ name: req.body.name });

        if (playlist) {
            return res.status(CONFLICT).json({
                message: "Playlist with name already exist",
                data: null,
                success: false,
            });
        }

        req.body.userId = req.user._id;

        const doc = await PlaylistModel.create(req.body);

        return res.status(CREATED).json({
            message: "Playlist created successfully",
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
        const playlists = await PlaylistModel.find({ userId: req.user._id }).populate("songs");

        return res.status(OK).json({
            message: "",
            data: playlists,
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
        const playlist = await PlaylistModel.findById(req.params.playlistId).populate("songs");

        return res.status(OK).json({
            message: "",
            data: playlist,
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

const update = async (req, res) => {
    try {
        const playlist = await PlaylistModel.findById(req.params.playlistId);

        if (!playlist) {
            return res.status(NOT_FOUND).json({
                message: "Playlist not found",
                data: null,
                success: false,
            });
        }

        const isExist = await PlaylistModel.findOne({ name: req.body.name });

        if (isExist) {
            return res.status(CONFLICT).json({
                message: "Playlist with name already exist",
                data: null,
                success: false,
            });
        }

        playlist.name = req.body.name;
        await playlist.save();

        return res.status(OK).json({
            message: "Playlist has been updated",
            data: playlist,
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

const addSong = async (req, res) => {
    try {
        const playlist = await PlaylistModel.findById(req.params.playlistId);

        if (!playlist) {
            return res.status(NOT_FOUND).json({
                message: "Playlist not found",
                data: null,
                success: false,
            });
        }

        const isExist = playlist.songs.find((song) => song.toString() === req.body.songId);

        if (isExist) {
            return res.status(CONFLICT).json({
                message: "Song already added to playlist",
                data: null,
                success: false,
            });
        }

        playlist.songs.push(req.body.songId);
        await playlist.save();
        await playlist.populate("songs");

        return res.status(OK).json({
            message: "Song added to playlist",
            data: playlist,
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

module.exports = { create, getAll, get, update, addSong };
