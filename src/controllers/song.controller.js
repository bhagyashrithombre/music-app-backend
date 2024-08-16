const { CONFLICT, CREATED, NOT_FOUND, INTERNAL_SERVER_ERROR, OK } = require("http-status");
const SongModel = require("../models/Songs.model");

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

        const doc = await SongModel.create(req.body);

        return res.status(CREATED).json({
            message: "Song created successfully",
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

module.exports = { create, getAll, get };
