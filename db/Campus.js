const conn = require('./conn');
const { Sequelize } = conn;

const Campus = conn.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
}, {
  getterMethods: {
    imageUrl() {
      return `/public/images/campus${ this.id%5 }.jpg`;
    }
  }
});


module.exports = Campus;
