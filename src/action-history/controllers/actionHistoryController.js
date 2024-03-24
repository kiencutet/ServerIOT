const actionHistoryModel = require('../models/actionHistory');

class actionHistoryController {
  // [GET] /
  async getAll(req, res, next) {
    try {
      const ActionHistory = await actionHistoryModel(); // Lấy mô hình ActionHistory từ actionHistory.js
      const historyActions = await ActionHistory.findAll(); // Lấy tất cả dữ liệu từ model ActionHistory

      // Trả về dữ liệu dưới dạng JSON
      res.json(historyActions);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params; // Lấy ID từ đường dẫn
      const actionId = parseInt(id); // Chuyển đổi ID thành số nguyên

      // Kiểm tra xem ID có phải là một số hợp lệ không
      if (isNaN(actionId)) {
        return res.status(400).send('ID không hợp lệ');
      }

      const ActionHistory = await actionHistoryModel(); // Lấy mô hình ActionHistory từ actionHistory.js
      const actionHistory = await ActionHistory.findByPk(actionId); // Lấy dữ liệu từ model ActionHistory theo ID

      // Kiểm tra xem dữ liệu có tồn tại không
      if (!actionHistory) {
        return res
          .status(404)
          .send('Không tìm thấy dữ liệu cho ID đã chỉ định');
      }

      // Trả về dữ liệu dưới dạng JSON
      res.send(actionHistory);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      // Lấy đủ dữ liệu từ yêu cầu
      const { deviceName, action } = req.body;

      // Thêm dữ liệu mới vào cơ sở dữ liệu
      const ActionHistory = await actionHistoryModel();
      const newActionHistory = await ActionHistory.create({
        deviceName,
        action,
      });

      // Trả về dữ liệu mới đã tạo dưới dạng JSON
      res.status(201).json(newActionHistory);
    } catch (error) {
      next(error); // Chuyển tiếp lỗi nếu có
    }
  }

  async update(req, res, next) {
    try {
      // Lấy đủ dữ liệu từ yêu cầu
      const { id } = req.params;
      const { deviceName, action } = req.body;

      // Kiểm tra xem action history có tồn tại không
      const ActionHistory = await actionHistoryModel();
      const existingActionHistory = await ActionHistory.findByPk(id);
      if (!existingActionHistory) {
        return res.status(404).json({ error: 'Action history not found' });
      }

      // Cập nhật dữ liệu
      existingActionHistory.deviceName = deviceName;
      existingActionHistory.action = action;
      await existingActionHistory.save();

      // Trả về dữ liệu đã cập nhật dưới dạng JSON
      res.json(existingActionHistory);
    } catch (error) {
      next(error); // Chuyển tiếp lỗi nếu có
    }
  }

  async delete(req, res, next) {
    try {
      // Lấy id từ yêu cầu
      const { id } = req.params;

      // Kiểm tra xem action history có tồn tại không
      const ActionHistory = await actionHistoryModel();
      const existingActionHistory = await ActionHistory.findByPk(id);
      if (!existingActionHistory) {
        return res.status(404).json({ error: 'Action history not found' });
      }

      // Xóa action history
      await existingActionHistory.destroy();

      // Trả về thông báo xóa thành công
      res.json({ message: 'Action history deleted successfully' });
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
        const ActionHistory = await actionHistoryModel();
        const noSortedActionHistory = await ActionHistory.findAll();

        // Trả về dữ liệu đã sắp xếp dưới dạng JSON
        res.json(noSortedActionHistory);
      }

      // Sử dụng switch để xác định cách sắp xếp dữ liệu
      let order;
      switch (sort) {
        case 'deviceName_ASC':
          order = [['deviceName', 'ASC']];
          break;
        case 'deviceName_DESC':
          order = [['deviceName', 'DESC']];
          break;
        case 'action_ASC':
          order = [['action', 'ASC']];
          break;
        case 'action_DESC':
          order = [['action', 'DESC']];
          break;
        case 'createdAt_ASC':
          order = [['createdAt', 'ASC']];
          break;
        case 'createdAt_DESC':
          order = [['createdAt', 'DESC']];
          break;
        default:
          return res.status(400).json({ error: 'Invalid sort parameter' });
      }

      // Lấy dữ liệu từ cơ sở dữ liệu và sắp xếp nó
      const ActionHistory = await actionHistoryModel();
      const sortedActionHistory = await ActionHistory.findAll({ order });

      // Trả về dữ liệu đã sắp xếp dưới dạng JSON
      res.json(sortedActionHistory);
    } catch (error) {
      next(error); // Chuyển tiếp lỗi nếu có
    }
  }
}

module.exports = new actionHistoryController();
