const express = require('express')
const router = express.Router()
const {getContact, createContact, updateContact, deleteContact, getOneContact} = require('../controllers/contact-controller')
const validateAccessToken = require('../middleWare/validateAccessToken')


router.use(validateAccessToken)

router.route("/").get(getContact).post(createContact)

router.route("/:id").get(getOneContact).put(updateContact).delete(deleteContact)


module.exports = router