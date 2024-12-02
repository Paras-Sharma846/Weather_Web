const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const STATUS_CODES = require('../utils/statusCode');
const sendResponse = require('../utils/responseHandler');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      sendResponse(res, STATUS_CODES.UNAUTHORIZED, 'Not authorized, token failed');
    }
  } else {
    sendResponse(res, STATUS_CODES.UNAUTHORIZED, 'Not authorized, no token provided');
  }
};

module.exports = { protect };
