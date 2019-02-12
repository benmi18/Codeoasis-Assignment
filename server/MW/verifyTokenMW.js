const mw = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    req.token = bearer[1];
    next();
  } else {
    req.forbidden = true;
    next();
  }
};

module.exports = mw;
