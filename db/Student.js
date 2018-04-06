const conn = require('./conn');
const { Sequelize } = conn;

const Student = conn.define('student', {
  name: Sequelize.STRING
});

// Students

// have profile info including:
// firstName - not empty or null
// lastName - not empty or null
// email - not empty or null; valid email
// gpa - decimal between 0.0 and 4.0
// must have a virtual 'name' field which is the concatenation of firstName and lastName
// must be assigned to a campus

module.exports = Student;
