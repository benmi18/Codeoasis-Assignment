const express = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = require('../MW/verifyTokenMW');
const deviceModel = require('../models/device-model');
const config = require('../app-config');

const router = express.Router();

router.use(verifyToken);

// Get all devices
router.get('/', (req, res) => {
  jwt.verify(req.token, config.secret, (err, decoded) => {
    if (err) {
      res.json({ success: false, err });
    } else {
      deviceModel.find((err, devices) => {
        if (err) {
          res.json({ success: false, err });
        } else {
          if (devices.length < 1) {
            res.json({ success: false, message: 'no devices' });
          } else {
            res.json({ success: true, devices });
          }
        }
      });
    }
  });
});

// Add new device
router.post('/', (req, res) => {
  const _id = req.body._id,
    name = req.body.name,
    description = req.body.description;

  jwt.verify(req.token, config.secret, (err, decoded) => {
    if (err) {
      res.json({ success: false, err });
    } else {
      const newDevice = new deviceModel({ _id, name, description });
      newDevice.save((err, newDev) => {
        if (err) {
          res.json({ success: false, message: 'save error', err });
        } else {
          res.json({
            success: true,
            newDev
          });
        }
      });
    }
  });
});

// Edit device
router.put('/:id', (req, res) => {
  const _id = req.params.id,
    newData = req.body;

  jwt.verify(req.token, config.secret, (err, decoded) => {
    if (err) {
      res.json({ success: false, err });
    } else {
      deviceModel.findByIdAndUpdate(_id, newData, (err, result) => {
        if (err) {
          res.json({ success: false, err });
        } else {
          res.json({ success: true, result, _id });
        }
      });
    }
  });
});

//  Delete Device
router.delete('/:id', (req, res) => {
  const _id = req.params.id;

  jwt.verify(req.token, config.secret, (err, decoded) => {
    if (err) {
      res.json({ success: false, err });
    } else {
      deviceModel.findByIdAndRemove(_id, (err, result) => {
        if (err) {
          res.json({ success: false, err });
        } else {
          res.json({ success: true, result, _id });
        }
      });
    }
  });
});

module.exports = router;
