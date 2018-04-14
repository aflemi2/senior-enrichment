import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Nav = ({ students, campuses })=> {
  if(!students){
    return null;
  }
  if(!campuses){
    return null;
  }

  return (
    <ul className="navbar navbar-expand-md navbar-dark bg-dark mb-4 row justify-content-between" >
      <div className="nav-item col-4">
        <NavLink className="nav-link" to='/'>
          Home
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink className="nav-link" to='/students'>
          Students ({ students.length })
        </NavLink>
      </div>
      <div className="nav-item">
      <NavLink className="nav-link" to='/campuses'>
         Campuses ({ campuses.length })
        </NavLink>
      </div>
    </ul>
  );
};

const mapStateToProps = ({ students, campuses })=> {
  return {
    students,
    campuses
  };
};

export default connect(mapStateToProps)(Nav);
