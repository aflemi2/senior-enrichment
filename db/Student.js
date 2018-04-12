const conn = require('./conn');
const { Sequelize } = conn;

const randomPhoto = ()=> { //Bug...will run on every reload
  const num = Math.floor(Math.random()*17)+1;
  return `/public/images/student${num}.jpg`;
}

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
  }
,{
  getterMethods: {
    imageUrl() {
      return this.id > 10 ? `/public/images/student${ this.id%10 + 11}.jpg` :
       `/public/images/student${ this.id%10 + 1}.jpg`;
    },
    name() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});


module.exports = Student;
