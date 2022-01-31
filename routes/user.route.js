const {
    Router
} = require('express')

const router = Router()

const { index, store, update, destroy } = require('../controllers/user.controller')

router.get('/', index)
router.post('/', store)
router.put('/:id', update)
router.post('/:id', destroy)




module.exports = router