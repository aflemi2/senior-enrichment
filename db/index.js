const conn = require('./conn');
const Campus = require('./Campus');
const Student = require('./Student');
const faker = require('faker');

Student.belongsTo(Campus);
Campus.hasMany(Student);

//Generate Random Seed Data
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

//Campus Descriptions Array
const descriptions = ['Welcome to North Campus, it is truly a wonderful place to learn. Of all the cardinal directions, this campus will always be at the forefront of the collective unconscious. We strive to produces bright and brilliant students. Enroll today!', 'Welcome to South Campus, it is maybe a wonderful place to learn. Of all the cardinal directions, this campus will always be an after thought in the collective unconscious. We strive to produces boring and mediocre students. We accept transfer students!','Welcome to East Campus it is truly a wonderful place to learn. The sun rises on our campus and then makes its way to other less important campuses. Our students enjoy New England Clam Chowder, Large slices of pizza and other East Coast themed items in our cafeteria. Enroll today, tomorrow we will be closed!' ];

//Sync and Seed function
const syncAndSeed = ()=> {
  conn.sync({ force: true })
  .then(()=>{
    return Promise.all([
      Campus.create({ name: 'North Campus', address: '12 North Blvd., Planet Rock', description: descriptions[0] }),
      Campus.create({ name: 'South Campus', address:'14444 Southern Blvd., Dark Side Of The Moon', description: descriptions[1]}),
      Campus.create({ name: 'East Campus', address:'53 East 507th street, Mars', description: descriptions[2]}),
      Student.create({ firstName: 'Moe' , lastName: 'Brown', gpa: randomNum(), email: email()}),
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
    .then(([ camp1, camp2, camp3, moe, larry, curly, r1, r2, r3, r4, r5, r6 ])=> {
      return Promise.all([
        moe.setCampus(camp1),
        larry.setCampus(camp2),
        curly.setCampus(camp3),
        r1.setCampus(camp3),
        r2.setCampus(camp3),
        r3.setCampus(camp3),
        r4.setCampus(camp2),
        r5.setCampus(camp2),
        r6.setCampus(camp1),
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
};
