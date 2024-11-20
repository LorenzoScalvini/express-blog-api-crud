const express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController.js')

//index router function
router.get('/', postsController.index) 

//show router function
router.get('/:id', postsController.show)

//store router function

//update router function

//modify router function

//destroy router function
router.delete('/:id', postsController.destroy)

module.exports = router