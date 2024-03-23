const express = require('express');
const router = express.Router();

const actionHistoryController = require('../action-history/controllers/actionHistoryController');

router.get('/show', actionHistoryController.getAll);

module.exports = router;
