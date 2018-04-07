import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campuses = ({ campuses }) => {
  return (
    <div className="container">
      <h2>All Campuses</h2>
      <hr />
      <div className="row">
        {
          campuses.map(campus => {
            return (
              <div className="col-sm" key={campus.id}>
                <Link to={`/campuses/${campus.id}`}>
                  <img src={campus.imageUrl} width={250} className="rounded" />
                  <br />
                  <div>{campus.name}</div>
                </Link>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

const mapStateToProps = ({ students, campuses }) => {
  return {
    students,
    campuses
  };
};

export default connect(mapStateToProps)(Campuses);
