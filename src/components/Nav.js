import React from 'react';
import { connect } from 'react-redux';

const Nav = ({ students })=> {
  if(!students){
    return null;
  }
  return (
    <ul>
      <li>
        Home
      </li>
      <li>
        Students ({ students.length })
      </li>
      <li>
        {/* Campuses ({ campuses.length }) */}
      </li>
    </ul>
  );
};

const mapStateToProps = ({ students })=> {
  return {
    students
  };
};

export default connect(mapStateToProps)(Nav);
