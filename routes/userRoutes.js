const express = require('express')
const { registerUser, loginUser, currentUser } = require('../controllers/user-controller')
const validateAccessToken = require('../middleWare/validateAccessToken')
const router = express.Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/current").get(validateAccessToken,currentUser)


module.exports = router