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
    <ul>
      <li>
        <NavLink to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/students'>
          Students ({ students.length })
        </NavLink>
      </li>
      <li>
      <NavLink to='/campuses'>
         Campuses ({ campuses.length })
        </NavLink>
      </li>
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
