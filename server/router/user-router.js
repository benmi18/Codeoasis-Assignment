const express = require('express');
const userModel = require('../models/user-model');

const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;
  userModel.findById(id, (err, user) => {
    res.json({
      user: {
        id: user._id,
        logedin: user.logedin,
        username: user.username,
        token: user.token
      }
    });
  });
});

module.exports = router;
