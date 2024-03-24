const express = require('express');
const router = express.Router();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const dataSensorController = require('../data-sensor/controllers/dataSensorController');

router.get('/datasensor/all', dataSensorController.getAll);
router.get('/datasensor/id/:id', dataSensorController.getById);
router.post('/datasensor/create', dataSensorController.create);
router.put('/datasensor/update/:id', dataSensorController.update);
router.delete('/datasensor/delete/:id', dataSensorController.delete);
router.get('/datasensor/sort', dataSensorController.sort);

module.exports = router;
