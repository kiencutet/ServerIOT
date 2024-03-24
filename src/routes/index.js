const dataSensorRouter = require('./dataSensorR');
const actionHistoryRouter = require('./actionHistoryR');
const swaggerJSDoc = require('../../swagger.json');
const swaggerUi = require('swagger-ui-express');
const dataSensorController = require('../data-sensor/controllers/dataSensorController');

function route(app) {
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));

  app.use('/', actionHistoryRouter);
  app.use('/', dataSensorRouter);
}

module.exports = route;
