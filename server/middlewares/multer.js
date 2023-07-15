const multer = require('multer');

//define the storage

const storage = multer.diskStorage({
    //define the destination for file
    destination: function (req, file, callback) {
        callback(null, './uploads')
    },
    //add back the etension
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname)
    }
});

//upload parameters for multer

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3
    },
});

module.exports = upload