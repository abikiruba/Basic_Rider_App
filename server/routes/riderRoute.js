const express = require("express");
const { getAllRiders,addRider,editRider,deleteRider,getSingleRider } = require("../controller/riderController");
const upload = require("../middlewares/multer");
const router = express.Router()


router.get('/',getAllRiders);
router.post('/add',upload.single('Image'),addRider);
router.put('/:id',upload.single('Image'),editRider);
router.delete('/:id',deleteRider);
router.get('/:id',getSingleRider);

module.exports = router