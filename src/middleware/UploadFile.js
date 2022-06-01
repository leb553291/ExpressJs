const Multer = require("multer");

const upload = new Multer({
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;