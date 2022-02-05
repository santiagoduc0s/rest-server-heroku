const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()

const {
    index,
    store,
    update,
    destroy
} = require('../app/controllers/user.controller')

const { storeMiddleware, updateMiddleware, deleteMiddleware } = require('../app/middleware/user.middleware')

router.get('/', index)
router.post('/', storeMiddleware, store)
router.put('/:id', updateMiddleware, update)
router.delete('/:id', deleteMiddleware, destroy)


module.exports = router