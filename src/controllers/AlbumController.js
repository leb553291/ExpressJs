const AlbumModel = require("../model/AlbumModel");
const fs = require('fs');
const { viewsPath } = require("../config/Path.js");

module.exports = {
    getAlbums: async (req, res) => {
        const albums = await AlbumModel.find();
        res.render(viewsPath + "albums", { albums, user: req.user, });
    },
    getAddAlbum: async (req, res) => {


        res.render(viewsPath + "addalbum", { user: req.user, });
    },
    createAlbum: async (req, res) => {

    },
    deleteAlbum: (req, res) => {

    },
    updateAlbum: (req, res) => {

    }

}