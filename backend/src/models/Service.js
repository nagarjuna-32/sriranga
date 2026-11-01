const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Service = sequelize.define('Service', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    full_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(50),
      defaultValue: 'Briefcase',
    },
    features: {
      type: DataTypes.JSON,
      defaultValue: [],
      get() {
        const raw = this.getDataValue('features');
        if (!raw) return [];
        if (typeof raw === 'string') {
          try {
            return JSON.parse(raw);
          } catch (e) {
            return raw.split(',').map(s => s.trim());
          }
        }
        return raw;
      },
      set(val) {
        if (typeof val === 'string') {
          try {
            this.setDataValue('features', JSON.parse(val));
          } catch (e) {
            this.setDataValue('features', val.split(',').map(s => s.trim()));
          }
        } else {
          this.setDataValue('features', val);
        }
      }
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    display_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'services',
    timestamps: true,
    underscored: true,
  });

  return Service;
};
