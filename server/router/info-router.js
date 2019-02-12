const express = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = require('../MW/verifyTokenMW');
const deviceHistoryModel = require('../models/device-history-model');
const config = require('../app-config');

const router = express.Router();

router.use(verifyToken);

// Get all history
router.get('/', (req, res) => {
  jwt.verify(req.token, config.secret, (err, decoded) => {
    if (err) {
      res.json({ success: false, err });
    } else {
      deviceHistoryModel
        .find()
        .sort({ created_at: -1 })
        .exec((err, history) => {
          if (err) {
            res.json({ success: false, err });
          } else {
            if (history.length < 1) {
              res.json({ success: false, message: 'no history' });
            } else {
              res.json({ success: true, history });
            }
          }
        });
    }
  });
});

// Add new history
router.post('/', (req, res) => {
  const device_name = req.body.device_name,
    room = req.body.room,
    department = req.body.department;

  jwt.verify(req.token, config.secret, (err, decoded) => {
    if (err) {
      res.json({ success: false, err });
    } else {
      const newHistory = new deviceHistoryModel({
        device_name,
        room,
        department
      });
      newHistory.save((err, history) => {
        if (err) {
          res.json({ success: false, message: 'save error', err });
        } else {
          res.json({
            success: true,
            history
          });
        }
      });
    }
  });
});

module.exports = router;
