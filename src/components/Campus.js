import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campus = ({ campus, studentsOnCampus }) => {
  if (!campus) {
    return null;
  }
  const students = (studentsOnCampus.length === 0) ? (
    <div>
      There are no students registered at this campus.
    </div>
  ) :
  (
    studentsOnCampus.map(student => {
      return (
        <div key={student.id}>
          <Link to={`/students/${student.id}`}>
            {student.name}
          </Link>
          <br />
          <img src={student.imageUrl} width={80} className="rounded" />
        </div>
      );
    }
    )
  );

  return (
    <div>
      <h1>Welcome to {campus.name}</h1>
      <hr />
      <img src={campus.imageUrl} width={400} className="rounded" />
      <br />
      <h3>Students:</h3>
      <h3>{students}</h3>
    </div>
  );
};

const mapStateToProps = ({ campuses, students }, { id }) => {
  const campus = campuses.find(campus => campus.id === id);
  const studentsOnCampus = students.filter(student => student.campusId === id);
  return {
    campus,
    studentsOnCampus
  };
};

export default connect(mapStateToProps)(Campus);

