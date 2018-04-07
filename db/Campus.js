const conn = require('./conn');
const { Sequelize } = conn;

const Campus = conn.define('campus', {
  name: Sequelize.STRING
}, {
  getterMethods: {
    imageUrl() {
      return `/dist/images/campus${ this.id%5 }.jpg`;
    }
  }
});

// Campuses

// have profile info including:
// name - not empty or null
// imageUrl - default value
// description - extremely large text
// can have many students assigned (may have none)

module.exports = Campus;
