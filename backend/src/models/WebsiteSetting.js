const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const WebsiteSetting = sequelize.define('WebsiteSetting', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    setting_key: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    setting_value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    setting_group: {
      type: DataTypes.STRING(50),
      defaultValue: 'general',
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    tableName: 'website_settings',
    timestamps: true,
    underscored: true,
  });

  return WebsiteSetting;
};
