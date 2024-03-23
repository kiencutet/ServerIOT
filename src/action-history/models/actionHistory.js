const { Sequelize, DataTypes } = require('sequelize');
const { connect } = require('../../config/db/connectdb');

async function actionHistory() {
  try {
    const url = await connect(); // Lấy URL của cơ sở dữ liệu MySQL từ hàm connect()
    const sequelize = new Sequelize(url);

    const ActionHistoryModel = sequelize.define(
      'action_histories',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        deviceName: {
          type: DataTypes.STRING, // Kiểu varchar
          allowNull: false,
        },
        action: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false,
        },
      },
      {
        timestamps: false, // Tắt chức năng tự động thêm `createdAt` và `updatedAt`
      },
    );

    return ActionHistoryModel;
  } catch (error) {
    console.error('Loi:', error);
    throw error;
  }
}

module.exports = actionHistory;
