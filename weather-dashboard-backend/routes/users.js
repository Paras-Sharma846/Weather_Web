const express = require('express');
const router = express.Router();
const  { registerUser,loginUser } = require('../controllers/users');
const {protect} = require('../middlewares/authMiddleware')

// Add a new city
router.post('/register',registerUser)
router.post('/login',loginUser);



module.exports = router;
