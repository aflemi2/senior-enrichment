const conn = require('./conn');
const { Sequelize } = conn;

const randomPhoto = ()=> {
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
      if(this.id > 10){ return randomPhoto();}
       return `/public/images/student${ this.id%10 + 1}.jpg`;
    },
    name() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
});


module.exports = Student;
