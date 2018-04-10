import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveStudent } from '../redux/students';

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCampus: -1,
      error: null
    };
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSave(ev) {
    ev.preventDefault();
    const { firstName, lastName, gpa, email } = this.props.student;
    const student = {
      id: this.props.id,
      firstName: firstName,
      lastName: lastName,
      gpa: gpa,
      email: email,
      campusId: this.state.selectedCampus
    };
    this.props.saveStudent(student);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value*1 });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.student){
      this.setState({
        id: nextProps.student.id,
        firstName: nextProps.student.firstName,
        lastName: nextProps.student.lastName,
        gpa: nextProps.student.gpa,
        email: nextProps.student.email,
        campusId: nextProps.student.campusId
      });
    }
  }

  render() {
    const { campus, student, campusesFiltered } = this.props;
    const { onSave, onChange } = this;
    const { selectedCampus } = this.state;
    const campusName = campus ? (
      <div> Attending:
      <Link to={`/campuses/${campus.id}`}> {campus.name} </Link>
      </div>
    ) : (
        <p style={{ color: 'red' }}>This student is not registered with a campus.</p>);
    if (!student) {
      return null;
    }
    return (
      <div className='container'>
        <h2>Student Profile Page</h2>
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
            <form onSubmit={onSave}>
              <select value={selectedCampus} name='selectedCampus' onChange={onChange} >
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

              <button disabled={selectedCampus * 1 === -1}>
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

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    saveStudent: (student) => dispatch(saveStudent(student, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Student);

