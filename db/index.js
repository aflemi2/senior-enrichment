const conn = require('./conn');
const Campus = require('./Campus');
const Student = require('./Student');

Student.belongsTo(Campus);
Campus.hasMany(Student);

const syncAndSeed = ()=> {
  conn.sync({ force: true })
  .then(()=>{
    return Promise.all([
      Campus.create({ name: 'North Campus'}),
      Campus.create({ name: 'South Campus'}),
      Campus.create({ name: 'East Campus'}),
      Student.create({ name: 'Moe'}),
      Student.create({ name: 'Larry'}),
      Student.create({ name: 'Curly'})
    ]);
});
};

module.exports = {
  syncAndSeed,
  models: {
    Student,
    Campus
  }
}
