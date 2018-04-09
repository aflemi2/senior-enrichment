import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveStudent } from '../redux/students';


class StudentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gpa: '',
      email: '',
      error: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
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
    if(nextProps.student){
      this.setState({
        firstName: nextProps.student.firstName,
        lastName: nextProps.student.lastName,
        gpa: nextProps.student.gpa,
        email: nextProps.student.email
      });
    }
  }

  render() {
    const { firstName, lastName, gpa, email, error } = this.state;
    const { onChange, onSave } = this;
    return (
      <div>
        <h1>Create A Student</h1>
        <form onSubmit={onSave}>
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
          <button>Add Student</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    saveStudent: (student) => dispatch(saveStudent(student, history)),

  };
};

export default connect(null, mapDispatchToProps)(StudentCreate);
