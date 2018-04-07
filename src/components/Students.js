import React from 'react';
import { connect } from 'react-redux';

const Students = ({ students, campuses })=> {
  return (
    <ul>
      {
        students.map( student => {
          const campus = campuses.find( campus => campus.id === student.campusId);
          if(!campus){
            return null;
          }
          return (
            <li key={ student.id }>
            <img src = { student.imageUrl } width = { 100 } />
             <br />
              { student.name }
             <br />
              { campus.name }
            </li>
          );
        })
      }
    </ul>
  );
};

const mapStateToProps = ({ students, campuses })=> {
  return {
    students,
    campuses
  };
};

export default connect(mapStateToProps)(Students);
