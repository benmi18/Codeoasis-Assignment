const express = require('express');
const jwt = require('jsonwebtoken');

const verifyToken = require('../MW/verifyTokenMW');
const departmentModel = require('../models/department-model');
const config = require('../app-config');

const router = express.Router();

router.use(verifyToken);

// Get all departments
router.get('/', (req, res) => {
  jwt.verify(req.token, config.secret, (err, decoded) => {
    if (err) {
      res.json({ success: false, err });
    } else {
      departmentModel.find((err, departments) => {
        if (err) {
          res.json({ success: false, err });
        } else {
          if (departments.length < 1) {
            res.json({ success: false, message: 'no departments' });
          } else {
            res.json({ success: true, departments });
          }
        }
      });
    }
  });
});

module.exports = router;
