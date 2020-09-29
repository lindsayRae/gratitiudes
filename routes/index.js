const express = require('express')
const router = express.Router()

const crud = require('./crud')
const gratitudes = require('./gratitudes')

// const auth = require('./auth')

module.exports = router

//router.use('/crud', crud)
router.use('/gratitudes', gratitudes)

// router.use('/auth', auth)