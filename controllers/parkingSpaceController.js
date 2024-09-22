const Space = require('../models/parkingSpaceModel');

exports.getAllParkingSpace = (req, res) => {
    ParkingSpace.findAll()
    .then(parkingSpaces => {
      res.json(parkingSpaces); // Return data as JSON
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve parking spaces' });
    });
};