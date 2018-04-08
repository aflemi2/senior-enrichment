import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveStudent, deleteStudent } from '../redux/students';


class StudentUpdate extends Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: this.props.student ? this.props.student.firstName : '',
      lastName: this.props.student ? this.props.student.lastName : '',
      gpa: this.props.student ? this.props.student.gpa : '',
      email: this.props.student ? this.props.student.email : '',
      error: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onDelete(){
    this.props.deleteStudent({ id: this.props.student.id });
  }
  onSave(ev) {
    ev.preventDefault();
    const student = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      gpa: this.state.gpa,
      email: this.state.email
    };
    this.props.saveStudent(student)
      .catch((err) => {
        this.setState({ error: err.response.data.name });
      });
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      firstName: nextProps.student ? nextProps.student.firstName : '',
      lastName: nextProps.student ? nextProps.student.lastName : '',
      gpa: nextProps.student ? nextProps.student.gpa : '',
      email: nextProps.student ? nextProps.student.email : '',
    });
  }
  render(){
    const { student } = this.props;
    const { firstName, lastName, gpa, email, error } = this.state;
    const { onChange, onSave, onDelete } = this;
    if(!student){
      return null;
    }
    return (
      <div>
        <h1>Editing { student.name }</h1>
        <form onSubmit={ onSave }>
          {
            error && (
              <div style={{ color: 'red' }}>
                {
                  error
                }
              </div>
            )
          }
          <div>First Name</div>
          <input value={firstName} name='firstName' onChange={onChange} />
          <div>Last Name</div>
          <input value={lastName} name='lastName' onChange={onChange} />
          <div>GPA</div>
          <input value={gpa} name='gpa' onChange={onChange} />
          <div>Email</div>
          <input value={email} name='email' onChange={onChange} />
          <button onClick={ onSave }>Add Student</button>
        </form>
        <button onClick={ onDelete }>Delete</button>
      </div>
    );
  }
}

const mapStateToProps = ({ students, campuses }, { id })=> {
  const student = students.find( student => student.id === id );
  return {
    student,
    campuses
  };
};

const mapDispatchToProps = (dispatch, { history })=> {
  return {
    saveStudent: (student)=> dispatch(saveStudent(student, history)),
    deleteStudent: (student)=> dispatch(deleteStudent(student, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentUpdate);
