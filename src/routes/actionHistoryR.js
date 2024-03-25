const express = require('express');
const router = express.Router();

const actionHistoryController = require('../action-history/controllers/actionHistoryController');

router.get('/actionhistory/all', actionHistoryController.getAll);
router.get('/actionhistory/id/:id', actionHistoryController.getById);
router.post('/actionhistory/create', actionHistoryController.create);
router.put('/actionhistory/update/:id', actionHistoryController.update);
router.patch('/actionhistory/updatestatus/:id', actionHistoryController.updateStatus);
router.delete('/actionhistory/delete/:id', actionHistoryController.delete);
router.get('/actionhistory/sort', actionHistoryController.sort);

module.exports = router;
