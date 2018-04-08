import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Students = ({ students, campuses }) => {
  if(students.length === 0){
    return <div>There are no students in the database.</div>; //doublecheck this.
  }
  return (
    <div className="container">
      <h2>All Students</h2>
      <Link to='/students/create'>Add Student</Link>
      <hr />
      <ul className="row">
        {
          students.map(student => {
            const campus = campuses.find(campus => campus.id === student.campusId);
            const campusName = !campus ? null : (<Link to={`/campuses/${campus.id}`}>{campus.name} </Link>);

            return (
              <div key={student.id} className="col-sm">
                <Link to={`/students/${student.id}`} key={student.id}>
                  <img src={student.imageUrl} width={100} className="rounded" />
                  <br />
                  {student.name}
                  </Link>
                  <br />
                   {campusName}

              </div>
            );
          })
        }
      </ul>
    </div>
  );
};

const mapStateToProps = ({ students, campuses }) => {
  return {
    students,
    campuses
  };
};

export default connect(mapStateToProps)(Students);
