const express = require('express');
const bcryt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user-model');
const config = require('../app-config');

const router = express.Router();

router.post('/login', (req, res) => {
  const username = req.body.username,
    password = req.body.password;

  userModel.findOne({ username }, (error, user) => {
    if (error) {
      res.status(401).send(error);
    }

    if (!user) {
      res.json({
        success: false,
        message: 'user not found'
      });
    } else {
      bcryt.compare(password, user.password).then(pass => {
        if (pass) {
          user.logedin = true;
          user.save();
          jwt.sign(
            { username, id: user._id },
            config.secret,
            { expiresIn: config.expiresIn },
            (error, token) => {
              res.json({
                success: true,
                user: { username, id: user._id },
                token,
                expiresIn: config.expiresIn,
                message: 'login in success'
              });
            }
          );
        } else {
          res.json({
            success: false,
            message: 'false password'
          });
        }
      });
    }
  });
});

router.get('/logout/:id', (req, res) => {
  const id = req.params.id;
  userModel.findById(id, (err, user) => {
    if (user) {
      user.logedin = false;
      user.save();
      res.json({ success: true, message: 'User loged out successfuly' });
    } else {
      res.json({ success: false, message: 'user not fount' });
    }
  });
});

module.exports = router;
