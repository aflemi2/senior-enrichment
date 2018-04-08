const conn = require('./conn');
const Campus = require('./Campus');
const Student = require('./Student');
const faker = require('faker');

Student.belongsTo(Campus);
Campus.hasMany(Student);

const randomNum = ()=> (Math.floor(Math.random()*41))/10;

const syncAndSeed = ()=> {
  conn.sync({ force: true })
  .then(()=>{
    return Promise.all([
      Campus.create({ name: 'North Campus',
      description: faker.lorem.paragraph(6) }),
      Campus.create({ name: 'South Campus',
      description: faker.lorem.paragraph(7)}),
      Campus.create({ name: 'East Campus',
      description: faker.lorem.paragraph(6)}),
      Student.create({ firstName: 'Moe' , lastName: 'Brown', gpa: randomNum()}),
      Student.create({ firstName: 'Brad', lastName: 'Smith' , gpa: randomNum()}), Student.create({ firstName: 'Larry', lastName: 'Starr' , gpa: randomNum()}),Student.create({ firstName: 'Curly', lastName: 'Loo' , gpa: randomNum()}),
      Student.create({ firstName: 'Brenda', lastName: 'Smith' , gpa: randomNum()}),
      Student.create({ firstName: 'Steve', lastName: 'Smith' , gpa: randomNum()}),
      Student.create({ firstName: 'Fred', lastName: 'Smith' , gpa: randomNum()}),
      Student.create({ firstName: 'Bey', lastName: 'Smith' , gpa: randomNum()}),
      Student.create({ firstName: 'Ted', lastName: 'Smith' , gpa: randomNum()}),
      Campus.create({ name: 'Empty Campus'})
    ])
    .then(([ camp1, camp2, camp3, moe, larry, brad, curly ])=> {
      return Promise.all([
        moe.setCampus(camp1),
        larry.setCampus(camp2),
        brad.setCampus(camp3),
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
