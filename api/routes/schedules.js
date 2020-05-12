const express = require('express')
const router = express.Router()
const api = require('../controllers/schedules')

router.get('/', api.get)
router.post('/', api.post)
router.get('/:scheduleId', api.getscheduleId)
router.patch('/:scheduleId', api.patch)
router.delete('/:scheduleId', api.delete)

module.exports = router
