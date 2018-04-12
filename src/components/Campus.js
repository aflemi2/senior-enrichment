import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campus = ({ campus, studentsOnCampus }) => {
  if (!campus) {
    return null;
  }
  const students = (studentsOnCampus.length === 0) ? (
    <div>
      <div>
        There are no students registered at this campus.
      </div>
      <Link to={`/campuses/update/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>
    </div>
  ) :
  (
    studentsOnCampus.map(student => {
      return (
        <div key={student.id} className="col-sm">
          <img src={student.imageUrl} width={100} className="rounded" />
            <br />
          <Link to={`/students/${student.id}`} className="small">
            {student.name}
          </Link>
        </div>
      );
    }
    )
  );

  return (
    <div>
      <h1>Welcome to {campus.name}</h1>
      <hr />
      <div className="row">
        <img src={campus.imageUrl} width={250} className="col rounded" />
        <div className="col">
           {campus.description}
           <br />
           <br />
           <Link to={`/campuses/update/${campus.id}`}>
            <button>Edit Campus</button>
            </Link>
        </div>
      </div>
      <br />
      <h3>Students:</h3>
      <h3 className="row" style={{ float: 'left' }}>{students}</h3>
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

