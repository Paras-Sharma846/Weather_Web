const { User } = require('../models/user');
const { generateToken } = require('../utils/genToken');
const { hashPassword,comparePassword } = require('../utils/bcrypt');
const STATUS_CODES = require('../utils/statusCode');
const sendResponse = require('../utils/responseHandler');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      sendResponse(res, STATUS_CODES.BAD_REQUEST, "Please add all fields");
      return;
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      sendResponse(res, STATUS_CODES.BAD_REQUEST, "User already exists");
      return;
    }

    // Create hash password
    const hashedPassword = await hashPassword(password);
    console.log('hashedPassword', hashedPassword);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      sendResponse(res, STATUS_CODES.CREATED, "User registered successfully", {
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      sendResponse(res, STATUS_CODES.BAD_REQUEST, "Invalid user data");
    }
  } catch (error) {
    sendResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, error.message);
  }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Validate request
      if (!email || !password) {
        sendResponse(res, STATUS_CODES.BAD_REQUEST, "Please provide email and password");
        return;
      }
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        sendResponse(res, STATUS_CODES.UNAUTHORIZED, "Invalid email or password");
        return;
      }
  
      // Compare passwords
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        sendResponse(res, STATUS_CODES.UNAUTHORIZED, "Invalid email or password");
        return;
      }
  
      // Send successful response
      sendResponse(res, STATUS_CODES.OK, "Login successful", {
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } catch (error) {
      sendResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, error.message);
    }
  };
  

module.exports = {
  registerUser,
  loginUser
};
