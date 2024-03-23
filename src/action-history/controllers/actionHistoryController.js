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
}

module.exports = new actionHistoryController();
