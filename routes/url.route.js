const express = require('express')
const { createShortUrl, redirectURL, deleteURL, getDetails } = require('../controllers/urlController')

const router = express.Router()


router.post('/createUrl', createShortUrl)
router.get("/redirect/:shortCode", redirectURL)
router.delete('/delete/:shortCode', deleteURL)
router.get("/getdetails/:shortCode", getDetails)



module.exports = router