const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PortfolioProject = sequelize.define('PortfolioProject', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    client_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    project_date: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tags: {
      type: DataTypes.JSON,
      defaultValue: [],
      get() {
        const raw = this.getDataValue('tags');
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
            this.setDataValue('tags', JSON.parse(val));
          } catch (e) {
            this.setDataValue('tags', val.split(',').map(s => s.trim()));
          }
        } else {
          this.setDataValue('tags', val);
        }
      }
    },
    is_featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'portfolio_projects',
    timestamps: true,
    underscored: true,
  });

  return PortfolioProject;
};
