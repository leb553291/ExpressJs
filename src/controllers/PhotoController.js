const PhotoModel = require('../model/PhotoModel');
const fs = require('fs');
const { viewsPath } = require('../config/Path.js');
const POST_PER_PAGE = 20;
module.exports = {
    getPhotos: async (req, res) => {
        let page = Number(req.query.page);
        if (!page) page = 1;
        let skip = (page - 1) * 20;
        const photos = await PhotoModel.find({ user: req.user._id }).skip(skip).limit(POST_PER_PAGE);
        const count = await PhotoModel.count({ user: req.user._id });
        const numberPhoto = Math.ceil(count / POST_PER_PAGE);
        res.render(viewsPath + 'photos', { user: req.user, photos, numberPhoto });
    },
    getAddPhotos: async (req, res) => {

        res.render(viewsPath + 'addphoto', { user: req.user });
    },
    getEditPhoto: async (req, res) => {
        const photo = await PhotoModel.findOne({ _id: req.params.id });

        res.render(viewsPath + 'editphoto', { user: req.user, photo });
    },
    createPhoto: async (req, res) => {

        try {
            const photo = new PhotoModel({
                title: req.body.title,
                description: req.body.desc,
                image: 'data:image/png;base64, ' + req.file.buffer.toString('base64'),
                isPublic: req.body.sharingMode == false,
                user: req.user._id,
            });
            photo.save();
            res.render('')
        }
        catch (err) {
            console.log(err);
        }

        res.render(viewsPath + 'addphoto', { user: req.user });
    },
    delete: async (req, res) => {

        const photo = await PhotoModel.findByIdAndDelete(req.params.id);
        res.redirect('/photos');
    },
    updatePhoto: async (req, res) => {
        const photo = await PhotoModel.findById(req.params.id);
        const photoUpdate = {
            title: req.body.title,
            description: req.body.desc,
            isPublic: req.body.sharingMode == false,
            user: req.user._id,

        }

        if (req.file) {
            photoUpdate.image = 'data:image/png;base64, ' + req.file.buffer.toString('base64');
        }

        await photo.updateOne({ $set: photoUpdate });
        res.redirect('/photos');
    }

}