const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const dataSensorController = require('../data-sensor/controllers/dataSensorController');

router.get('/', dataSensorController.getAll);

module.exports = router;
