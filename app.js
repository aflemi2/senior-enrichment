const express = require('express');
const app = express();
const path = require('path');
const { models } = require('./db');
const { Campus, Student } = models;

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules/')));
app.use(require('body-parser').json());
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

//GET routes for campuses, campus, students and student.
app.get('/api/campuses', (req, res, next) => {
  Campus.findAll()
    .then(campuses => res.send(campuses))
    .catch(next);
});

app.get('/api/campuses/:id', (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => res.send(campus))
    .catch(next);
});

app.get('/api/students', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
    .catch(next);
});

app.get('/api/students/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => res.send(student))
    .catch(next);
});

//POST routes for creating a campus and a student.
app.post('/api/campuses', (req, res, next) => {
  Campus.create(req.body)
    .then(campus => res.send(campus))
    .catch(next);
});

app.post('/api/students', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.send(student))
    .catch(next);
});

//PUT routes for updating a campus and a student.
app.put('/api/campuses/:id', (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => {
      Object.assign(campus, req.body);
      return campus.save();
    })
    .then(campus => res.send(campus))
    .catch(next);
});

app.put('/api/students/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => {
      Object.assign(student, req.body);
      return student.save();
    })
    .then(student => res.send(student))
    .catch(next);
});

//DELETE routes for a campus and a student.
app.delete('/api/campuses/:id', (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => campus.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.delete('/api/students/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => student.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

module.exports = app;
