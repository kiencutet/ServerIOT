const dataSensor = require('../models/dataSensor');
class dataSensorController {
  // [GET] /
  async getAll(req, res, next) {
    try {
      const SensorData = await dataSensor(); // Lấy mô hình SensorData từ dataSensor.js
      const sensorData = await SensorData.findAll(); // Lấy tất cả dữ liệu từ model SensorData

      // Trả về dữ liệu dưới dạng JSON
      res.send(sensorData);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params; // Lấy ID từ đường dẫn
      const userId = parseInt(id); // Chuyển đổi ID thành số nguyên

      // Kiểm tra xem ID có phải là một số hợp lệ không
      if (isNaN(userId)) {
        return res.status(400).send('ID không hợp lệ');
      }

      const SensorData = await dataSensor(); // Lấy mô hình SensorData từ dataSensor.js
      const sensorData = await SensorData.findByPk(userId); // Lấy dữ liệu từ model SensorData theo ID

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

  async create(req, res, next) {
    try {
      // Lấy đủ dữ liệu từ yêu cầu
      const SensorData = await dataSensor();
      const { temperature, humidity, light } = req.body;
      console.log(req.body);
      // Thêm dữ liệu mới vào cơ sở dữ liệu
      const newSensorData = await SensorData.create({
        temperature,
        humidity,
        light,
      });

      // Trả về dữ liệu mới đã tạo dưới dạng JSON
      res.status(201).json(newSensorData);
    } catch (error) {
      next(error); // Chuyển tiếp lỗi nếu có
    }
  }

  async update(req, res, next) {
    try {
      // Lấy đủ dữ liệu từ yêu cầu
      const { id } = req.params;
      const { temperature, humidity, light } = req.body;

      // Kiểm tra xem datasensor có tồn tại không
      const SensorData = await dataSensor();
      const existingSensorData = await SensorData.findByPk(id);
      if (!existingSensorData) {
        return res.status(404).json({ error: 'Datasensor not found' });
      }

      // Cập nhật dữ liệu
      existingSensorData.temperature = temperature;
      existingSensorData.humidity = humidity;
      existingSensorData.light = light;
      await existingSensorData.save();

      // Trả về dữ liệu đã cập nhật dưới dạng JSON
      res.json(existingSensorData);
    } catch (error) {
      next(error); // Chuyển tiếp lỗi nếu có
    }
  }
  async delete(req, res, next) {
    try {
      // Lấy id từ yêu cầu
      const { id } = req.params;

      // Kiểm tra xem datasensor có tồn tại không
      const SensorData = await dataSensor();
      const existingSensorData = await SensorData.findByPk(id);
      if (!existingSensorData) {
        return res.status(404).json({ error: 'Datasensor not found' });
      }

      // Xóa datasensor
      await existingSensorData.destroy();

      // Trả về thông báo xóa thành công
      res.json({ message: 'Datasensor deleted successfully' });
    } catch (error) {
      next(error); // Chuyển tiếp lỗi nếu có
    }
  }

  async sort(req, res, next) {
    try {
      // Lấy tham số sort từ yêu cầu
      const { sort } = req.query;

      // Kiểm tra nếu không có tham số sort
      if (!sort) {
        const SensorData = await dataSensor();
        const noSortedSensorData = await SensorData.findAll();

        // Trả về dữ liệu đã sắp xếp dưới dạng JSON
        res.json(noSortedSensorData);
      }

      // Sử dụng switch để xác định cách sắp xếp dữ liệu
      let order;
      switch (sort) {
        case 'temperature_ASC':
          order = [['temperature', 'ASC']];
          break;
        case 'temperature_DESC':
          order = [['temperature', 'DESC']];
          break;
        case 'humidity_ASC':
          order = [['humidity', 'ASC']];
          break;
        case 'humidity_DESC':
          order = [['humidity', 'DESC']];
          break;
        case 'light_ASC':
          order = [['light', 'ASC']];
          break;
        case 'light_DESC':
          order = [['light', 'DESC']];
          break;
        default:
          return res.status(400).json({ error: 'Invalid sort parameter' });
      }

      // Lấy dữ liệu từ cơ sở dữ liệu và sắp xếp nó
      const SensorData = await dataSensor();
      const sortedSensorData = await SensorData.findAll({ order });

      // Trả về dữ liệu đã sắp xếp dưới dạng JSON
      res.json(sortedSensorData);
    } catch (error) {
      next(error); // Chuyển tiếp lỗi nếu có
    }
  }
}

module.exports = new dataSensorController();
