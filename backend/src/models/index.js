const { sequelize } = require('../config/database');

const initModels = (seqInstance) => {
  const instance = seqInstance || sequelize();
  
  const Admin = require('./Admin')(instance);
  const Category = require('./Category')(instance);
  const Service = require('./Service')(instance);
  const Provider = require('./Provider')(instance);
  const Enquiry = require('./Enquiry')(instance);
  const PortfolioProject = require('./PortfolioProject')(instance);
  const Testimonial = require('./Testimonial')(instance);
  const WebsiteSetting = require('./WebsiteSetting')(instance);

  return {
    Admin,
    Category,
    Service,
    Provider,
    Enquiry,
    PortfolioProject,
    Testimonial,
    WebsiteSetting,
    sequelize: instance,
  };
};

module.exports = initModels;
