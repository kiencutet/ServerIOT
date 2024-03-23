const dataSensorRouter = require('./dataSensorR');
const actionHistoryRouter = require('./actionHistoryR');
const swaggerJSDoc = require('../../swagger.json');
const swaggerUi = require('swagger-ui-express');

function route(app) {
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));

  app.use('/action_history', actionHistoryRouter);
  app.use('/data_sensor', dataSensorRouter);
}

module.exports = route;
