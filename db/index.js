const conn = require('./conn');
const Campus = require('./Campus');
const Student = require('./Student');
const faker = require('faker');

Student.belongsTo(Campus);
Campus.hasMany(Student);

const randomNum = ()=> (Math.floor(Math.random()*41))/10;
const email = ()=> faker.internet.email();
const randomStudent = ()=> {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    gpa: randomNum(),
    email: email()
  };
};


const syncAndSeed = ()=> {
  conn.sync({ force: true })
  .then(()=>{
    return Promise.all([
      Campus.create({ name: 'North Campus',description: faker.lorem.paragraph(6) }),
      Campus.create({ name: 'South Campus', description: faker.lorem.paragraph(7)}),
      Campus.create({ name: 'East Campus', description: faker.lorem.paragraph(6)}),
      Student.create({ firstName: 'Moe' , lastName: 'Brown', gpa: randomNum(), email: email(), imageUrl: '/public/images/student11.jpg'}),
      Student.create({ firstName: 'Curly', lastName: 'Loo' , gpa: randomNum(), email: email()}),
      Student.create({ firstName: 'Bey', lastName: 'Smith' , gpa: randomNum(), email: email()}),
      Student.create(randomStudent()),
      Student.create(randomStudent()),
      Student.create(randomStudent()),
      Student.create(randomStudent()),
      Student.create(randomStudent()),
      Student.create(randomStudent()),
      Student.create(randomStudent()),
      Student.create(randomStudent()),
      Student.create(randomStudent()),
      Student.create(randomStudent()),
      Student.create(randomStudent()),
      Student.create(randomStudent()),
      Campus.create({ name: 'Empty Campus'})
    ])
    .then(([ camp1, camp2, camp3, moe, larry, curly, r1, r2, r3 ])=> {
      return Promise.all([
        moe.setCampus(camp1),
        larry.setCampus(camp2),
        curly.setCampus(camp3),
        r1.setCampus(camp3),
        r2.setCampus(camp3),
        r3.setCampus(camp3),
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
