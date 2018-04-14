import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCampus, deleteCampus } from '../redux/campuses';
import { saveStudent } from '../redux/students';

class CampusForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.campus ? this.props.campus.name : '',
      address: this.props.campus ? this.props.campus.address : '',
      description: this.props.campus ? this.props.campus.description : '',
      selectedStudent: -1,
      error: null,
      errors: {}
    };
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeStudent = this.onChangeStudent.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onAddStudent = this.onAddStudent.bind(this);
    this.onDeleteStudent = this.onDeleteStudent.bind(this);
    this.validators = {
      name: (value) => {
        if (!value) {
          return 'Campus name is required.';
        }
      },
      address: (value) => {
        if (!value) {
          return 'Address is required.';
        }
      },
      description: (value) => {
        if (!value) {
          return 'Must provide a campus description.';
        }
      }
    };
  }

  onDelete() {
    this.props.deleteCampus({ id: this.props.id });
  }

  onSave(ev) {
    ev.preventDefault();
    const errors = Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if (error) {
        memo[key] = error;
      }
      return memo;
    }, {});
    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }
    const campus = {
      id: this.props.id,
      name: this.state.name,
      address: this.state.address,
      description: this.state.description
    };
    this.props.saveCampus(campus);
  }

  onAddStudent(ev) {
    ev.preventDefault();
    const studentInfo = this.props.students.find(student => student.id === this.state.selectedStudent);
    const student = {
      campusId: this.props.id,
      id: studentInfo.id,
      firstName: studentInfo.firstName,
      lastName: studentInfo.lastName,
      gpa: studentInfo.gpa,
      email: studentInfo.email
    };
    this.props.saveStudent(student);
    this.setState({ selectedStudent: -1 });
  }

  onDeleteStudent(ev) {
    ev.preventDefault();
    const studentInfo = this.props.students.find(student => student.id === ev.target.value * 1);
    const student = {
      campusId: null,
      id: studentInfo.id,
      firstName: studentInfo.firstName,
      lastName: studentInfo.lastName,
      gpa: studentInfo.gpa,
      email: studentInfo.email
    };
    this.props.saveStudent(student);
  }

  onChangeStudent(ev) {
    this.setState({ [ev.target.name]: ev.target.value * 1 });
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.campus) {
      this.setState({
        id: nextProps.campus.id,
        name: nextProps.campus.name,
        address: nextProps.campus.address,
        description: nextProps.campus.description
      });
    }
  }

  render() {
    const { campus, studentsOnCampus, studentsNotOnCampus, id } = this.props;
    const { name, address, description, selectedStudent, errors } = this.state;
    const { onSave, onChange, onChangeStudent, onDelete, onDeleteStudent, onAddStudent } = this;
    if (!id) {
      return (
        <div>
          <h1>Create A Campus</h1>
          <form onSubmit={onSave}>
            <div> Campus Name </div>
            <input value={name} name='name' onChange={onChange} />
            {errors.name}
            <div> Campus Location </div>
            <input value={address} name='address' onChange={onChange} />
            {errors.address}
            <div> Campus Description</div>
            <textarea value={description} name='description' onChange={onChange} rows={10} />
            <br />
            {errors.description}
            <br />
            <button>Add Campus</button>
          </form>
        </div>
      );
    }
    if (!campus) {
      return null;
    }
    return (
      <div>
        <div style={{ float: 'left' }}>
          <h2>Edit Campus: {campus.name}</h2>
          <form onSubmit={onSave}>
            <div> Campus Name </div>
            <input value={name} name='name' onChange={onChange} />
            {errors.name}
            <div> Campus Location </div>
            <input value={address} name='address' onChange={onChange} />
            {errors.address}
            <div> Campus Description</div>
            <textarea value={description} name='description' onChange={onChange} rows={10} />
            <br />
            {errors.description}
            <br />
            <button disabled={name.length === 0}>Save Changes</button>
            <br />
            <br />
            <button onClick={onDelete}>Delete Campus</button>
          </form>

          <form onSubmit={onAddStudent} >
            <select value={selectedStudent} name='selectedStudent' onChange={onChangeStudent} >
              <option>Select student</option>
              {
                studentsNotOnCampus.map(student => {
                  if (student) {
                    return (
                      <option key={student.id} value={student.id}>
                        {student.name} {student.campusId}
                      </option>
                    );
                  }
                }
                )
              }
            </select>
            <button disabled={selectedStudent * 1 === -1}>
              Add Student To Campus
            </button>
          </form>
        </div>
        <div style={{ float: 'right' }}>
          <h3>Students on Campus</h3>
          <div className='row'>
            {
              studentsOnCampus.map(student => {
                if (student) {
                  return (
                    <div key={student.id} className="col-sm">
                      <img src={student.imageUrl} width={100} className="rounded" />
                      <br />
                      {student.name} <button value={student.id} onClick={onDeleteStudent}>x</button>
                    </div>
                  );
                }
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    saveStudent: (student) => dispatch(saveStudent(student, history)),
    saveCampus: (campus) => dispatch(saveCampus(campus, history)),
    deleteCampus: (campus) => dispatch(deleteCampus(campus, history)),
  };
};

const mapStateToProps = ({ campuses, students }, { id }) => {
  const campus = campuses ? campuses.find(campus => id === campus.id) : null;
  const studentsOnCampus = campus ? students.filter(student => student.campusId === campus.id) : null;
  const studentsNotOnCampus = campus ? students.filter(student => student.campusId !== id) : null;
  return {
    id,
    campus,
    studentsNotOnCampus,
    studentsOnCampus,
    students
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm);

