import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Campuses = ({ campuses }) => {
  const noCampus = campuses.length === 0 ? (<h3> There are currently no campuses.</h3>) : (null);
  return (
    <div className="container">
      <Link to='/campuses/create' className="btn btn-outline-primary float-right">Add Campus</Link>
      <h2>All Campuses</h2>
      <hr />
      <div>{noCampus}</div>
      <div className="row">
        {
          campuses.map(campus => {
            return (
              <div className="col-sm" key={campus.id}>
                <Link to={`/campuses/${campus.id}`}>
                  <img src={campus.imageUrl} width={320} className="rounded" />
                  <br />
                  <div >{campus.name}</div>
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
