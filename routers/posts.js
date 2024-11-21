const express = require('express')
const router = express.Router()
const postsController = require('../controllers/postsController.js')

//index router function
router.get('/', postsController.index)

//show router function
router.get('/:id', postsController.show)

//store router function
router.post('/', postsController.store)

//update router function
router.put('/:id', postsController.update)

//modify router function
router.patch('/:id', postsController.modify)

//destroy router function
router.delete('/:id', postsController.destroy)

module.exports = router