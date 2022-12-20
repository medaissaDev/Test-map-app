const db = require("../models");
const Path = db.paths;
const Location = db.locations;

// Create and Save a new Path
exports.create = async (req, res) => {
  console.log("got body", req.body);
  var savedLocations = [];
  if (!req.body.pathName || !req.body.locations) {
    res.status(400).send({
      message: "Error messing required fileds",
    });
  }

  try {
    await Promise.all(
      req.body.locations.map(async (location) => {
        const newLocation = new Location({
          name: req.body.pathName,
          location: { coordinates: location },
        });
        const savedLocation = await newLocation.save();
        savedLocations.push(savedLocation._id);
      })
    );
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating a new location.",
    });
  }

  const newPath = new Path({
    name: req.body.pathName,
    locations: savedLocations,
  });

  newPath
    .save()
    .then((data) => {
      data.populate("locations", function (err, path) {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the path.",
          });
        }
        res.send({
          message: "Path created sucessfully",
          data: path,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the path.",
      });
    });
};

// Retrieve all Paths from the database.
exports.findAllPaths = (req, res) => {
  Path.find()
    .populate("locations")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving paths.",
      });
    });
};
