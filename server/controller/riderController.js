const { Long } = require("mongodb");
const Rider = require("../models/riderModel");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");


//Controller for the Get all Riders

const getAllRiders = async (req, res) => {
    const { page = 1, limit = 10, Name, Email, Id } = req.query;
    const query = {};

    if (Name) {
        query.Name = { $regex: Name, $options: "i" };
    }

    if (Email) {
        query.Email = { $regex: Email, $options: "i" };
    }

    if (Id) {
        query.Id = Id;
    }

    try {
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
        };

        const riders = await Rider.find(query)
            .sort({ Id: 1 })
            .skip((options.page - 1) * options.limit)
            .limit(options.limit)
            .exec();

        res.status(200).json(riders);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while searching for riders." });
    }
    // const riders = await Rider.find({}).exec();
    // res.status(200).json(riders)
}

//Controller for the Add a Rider

const addRider = async (req, res) => {
    try {
        //upload the image to the cloudinary
        const { path } = req.file
        const result = await cloudinary.uploader.upload(path)
        const rider = new Rider({
            Id: parseInt(req.body.Id), // Parse the Id value as an integer
            Name: req.body.Name,
            Email: req.body.Email,
            Position: req.body.Position,
            NRIC: req.body.NRIC,
            Status: req.body.Status,
            Image: result.secure_url,
            cloudinary_id: result.public_id
        });
        await rider.save()
        fs.unlinkSync(path)
        res.status(201).json(rider)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while adding a rider." });
    }
}

//Controller for the Edit a Rider

const editRider = async (req, res) => {
    try {
        let rider = await Rider.findById(req.params.id).exec();

        if (!rider) {
            return res.status(404).json({ error: "Rider not found" });
        }

        // delete the image from the cloudinary
        await cloudinary.uploader.destroy(rider.cloudinary_id);

        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }

        const data = {
            Id: parseInt(req.body.Id), // Parse the Id value as an integer
            Name: req.body.Name || rider.Name,
            Email: req.body.Email || rider.Email,
            Position: req.body.Position || rider.Position,
            NRIC: req.body.NRIC || rider.NRIC,
            Status: req.body.Status || rider.Status,
            Image: result?.secure_url || rider.Image,
            cloudinary_id: result?.public_id || rider.cloudinary_id,
        };

        rider = await Rider.findByIdAndUpdate(req.params.id, data, { new: true });

        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(200).json(rider);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while editing the rider." });
    }
};

// Controller for Delete the Rider
const deleteRider = async (req, res) => {
    try {
        const riderId = req.params.id;
        const rider = await Rider.findById(riderId);

        if (!rider) {
            return res.status(404).json({ error: 'Rider not found' });
        }

        // Delete the rider's image from Cloudinary
        await cloudinary.uploader.destroy(rider.cloudinary_id);

        // Remove the rider from the database
        await Rider.findByIdAndRemove(riderId);

        res.status(200).json(`Rider with the name ${rider.Name} was deleted successfully`);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while deleting the rider' });
    }
};

//Controller for Get a Specified Rider
const getSingleRider = async (req, res) => {
    try {
        let rider = await Rider.findById(req.params.id).exec();
        if (!rider) {
            return res.status(404).json({ error: "Rider not found" });
        }
        res.status(200).json(rider);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving the rider." });
    }
};

module.exports = {
    getAllRiders,
    addRider,
    editRider,
    deleteRider,
    getSingleRider
}