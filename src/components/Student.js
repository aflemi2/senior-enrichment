import React from 'react';
import { connect } from 'react-redux';

const Student = ({ campus, student }) => {
  if (!student) {
    return null;
  }
 const campusName = campus ? campus.name : 'this student is not registered with a campus.';
  return (
    <div>
      <h1>Student: {student.name}</h1>
      <hr />
      <img src={student.imageUrl} width={250} className="rounded" />
      <br />
      <h3>Attending:</h3>
      <h3>{ campusName }</h3>
    </div>
  );
};

const mapStateToProps = ({ campuses, students }, { id }) => {
  const student = students.find(student => student.id === id);
  const campus = campuses.find(campus => campus.id === student.campusId);
  return {
    campus,
    student
  };
};

export default connect(mapStateToProps)(Student);

