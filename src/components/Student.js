import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


// class Student = ({ campus, student, campusesFiltered }) =>
class Student extends Component {
  constructor(props){
    super(props);
    this.state = { selectedCampus: -1};
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSave(){

  }

  onChange(){

  }

render(){
  const { campus, student, campusesFiltered } = this.props;
  const { onSave, onChange } = this;
  const { selectedCampus } = this.state;
  const style = { color: 'red' };
  const campusName = campus ? (
    <div> Attending:
      <Link to={`/campuses/${campus.id}`}> {campus.name} </Link>
    </div>
    ) : (
    <p style={style}>This student is not registered with a campus.</p>);
  if (!student) {
    return null;
  }
  return (
    <div className='container'>
      <h1>Student Profile Page</h1>
      <hr />
      <div className='row'>
        <div className='col'>
          <img src={student.imageUrl} width={250} className="rounded" />
        </div>
        <br />
        <div className='col'>
          <h2> {student.name} </h2>
          <h3> {student.email}</h3>
          <h3> {campusName} </h3>
          <h3> GPA: {student.gpa}</h3>
          <Link to={`/students/update/${student.id}`}>
            <button>Edit Student</button></Link>
          <br />
          <br />
          <form onSubmit={ onSave }>
            <select value={selectedCampus} name='selectedCampus' onChange={ onChange } >
              <option value='-1'>Select Campus</option>
              {
                campusesFiltered.map(campus => {
                  return (
                    <option key={campus.id} value={campus.id}>
                      {campus.name}
                    </option>
                  );
                })
              }
            </select>

            <button disabled={student.campusId * 1 === -1}>
              Change Campus
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
}
const mapStateToProps = ({ campuses, students }, { id }) => {
  const student = students.find(student => student.id === id);
  const campusesFiltered = student ? campuses.filter(campus => campus.id !== student.campusId) : null;
  const campus = student ? campuses.find(campus => campus.id === student.campusId) : null;
  return {
    campus,
    student,
    campusesFiltered
  };
};

export default connect(mapStateToProps)(Student);

