const dataSensor = require('../models/dataSensor');
class dataSensorController {
  // [GET] /
  async getAll(req, res, next) {
    try {
      const SensorData = await dataSensor(); // Lấy mô hình SensorData từ dataSensor.js
      const sensorData = await SensorData.findAll(); // Lấy tất cả dữ liệu từ model SensorData

      // Trả về dữ liệu dưới dạng JSON
      res.json(sensorData);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new dataSensorController();
