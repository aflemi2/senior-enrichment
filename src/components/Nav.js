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
    <ul className="navbar navbar-default">
      <div>
        <NavLink to='/'>
          Home
        </NavLink>
      </div>
      <div>
        <NavLink to='/students'>
          Students ({ students.length })
        </NavLink>
      </div>
      <div>
      <NavLink to='/campuses'>
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
