const conn = require('./conn');
const { Sequelize } = conn;

const Student = conn.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  gpa: Sequelize.FLOAT,

},{
  getterMethods: {
    imageUrl() {
      return `/public/images/student${ this.id%5 }.jpg`;
    },
    name() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});


module.exports = Student;
