import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const Student = ({ campus, student }) => {
  if (!student) {
    return null;
  }
const campusName = campus ? (<Link to={`/campuses/${campus.id}`}>{campus.name} </Link>): 'This student is not registered with a campus.';
  return (
    <div>
      <h1>Student: {student.name}</h1>
      <hr />
      <img src={student.imageUrl} width={250} className="rounded" />
      <br />
      <h4> GPA: { student.gpa }</h4>
      <Link to={`/students/update/${student.id}`}> Edit Student</Link>
      <h3>Attending:</h3>
      <h4>{ campusName }</h4>
    </div>
  );
};

const mapStateToProps = ({ campuses, students }, { id }) => {
  const student = students.find(student => student.id === id);
  const campus = student ? campuses.find(campus => campus.id === student.campusId) : null;
  return {
    campus,
    student
  };
};

export default connect(mapStateToProps)(Student);

