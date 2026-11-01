const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Enquiry = sequelize.define('Enquiry', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: {
        isEmailOrEmpty(val) {
          if (val && val.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(val)) {
              throw new Error('Must be a valid email address');
            }
          }
        }
      }
    },
    service_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'contacted', 'completed'),
      defaultValue: 'pending',
    },
    admin_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'enquiries',
    timestamps: true,
    underscored: true,
  });

  return Enquiry;
};
