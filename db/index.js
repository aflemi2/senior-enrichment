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
      Student.create({ name: 'Moe' }),
      Student.create({ name: 'Larry'}),
      Student.create({ name: 'Curly'})
    ])
    .then(([ camp1, camp2, camp3, moe, larry, curly ])=> {
      return Promise.all([
        moe.setCampus(camp1),
        larry.setCampus(camp2),
        curly.setCampus(camp3)
      ]);
    });
});
};

module.exports = {
  syncAndSeed,
  models: {
    Student,
    Campus
  }
}
