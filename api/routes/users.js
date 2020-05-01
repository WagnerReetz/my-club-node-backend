const express = require('express');
const router = express.Router();
const api = require('../controllers/users');

router.get('/', api.get);
router.post('/', api.post);
router.get('/:userId', api.getuserId);
router.patch('/:userId', api.patch);
router.delete('/:userId', api.delete);

module.exports = router;