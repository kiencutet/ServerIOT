const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const dashBoardController = require('../dash-board/controllers/dashBoardController');

router.get('/dashboard/all', dashBoardController.getAll);
router.get('/dashboard/id/:id', dashBoardController.getById);

module.exports = router;
