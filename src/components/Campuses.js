import React from 'react';
import { connect } from 'react-redux';

const Campuses = ({ campuses })=> {
  return (
    <ul>
      {
        campuses.map( campus => {

          return (
            <li key={ campus.id }>
              <img src = { campus.imageUrl } width= { 300 } />
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

export default connect(mapStateToProps)(Campuses);
