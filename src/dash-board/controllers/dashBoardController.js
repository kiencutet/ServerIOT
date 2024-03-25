const dataSensor = require('../../data-sensor/models/dataSensor');

class dashBoardController {
  async getAll(req, res, next) {
    try {
      const SensorData = await dataSensor(); // Lấy mô hình SensorData từ dataSensor.js
      const sensorData = await SensorData.findAll({
        attributes: ['id', 'temperature', 'humidity', 'light'], // Chỉ lấy các trường temperature, humidity, và light
      });

      // Trả về dữ liệu dưới dạng JSON
      res.send(sensorData);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params; // Lấy ID từ đường dẫn

      // Kiểm tra xem ID có phải là một số hợp lệ không
      const userId = parseInt(id);
      if (isNaN(userId)) {
        return res.status(400).send('ID không hợp lệ');
      }

      const SensorData = await dataSensor(); // Lấy mô hình SensorData từ dataSensor.js
      const sensorData = await SensorData.findByPk(userId, {
        attributes: ['id', 'temperature', 'humidity', 'light'], // Chỉ lấy các trường temperature, humidity, và light
      });

      // Kiểm tra xem dữ liệu có tồn tại không
      if (!sensorData) {
        return res
          .status(404)
          .send('Không tìm thấy dữ liệu cho ID đã chỉ định');
      }

      // Trả về dữ liệu dưới dạng JSON
      res.send(sensorData);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new dashBoardController();
