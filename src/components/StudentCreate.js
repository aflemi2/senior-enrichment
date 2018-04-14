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
      error: null,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.validators = {
      firstName: (value)=> {
        if(!value){
          return 'First name is required.';
        }
      },
      lastName: (value)=> {
        if(!value){
          return 'Last name is required.';
        }
      },
      email: (value)=> {
        if(!value){
          return 'Email is required.';
        }
      },
      gpa: (value)=> {
        if(!value){
          return 'GPA is required.';
        }
        const num = parseInt(value);
        return (num < 0 || num > 4.1) ? 'GPA must be between 0.0 and 4.0.' : null;
        }
      };
    }


  onSave(ev) {
    ev.preventDefault();
    const errors = Object.keys(this.validators).reduce( (memo, key )=> {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if(error){
        memo[key] = error;
      }
      return memo;
    }, {});
    this.setState({ errors });
    if(Object.keys(errors).length){
      return;
    }
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
    const { firstName, lastName, gpa, email, error, errors } = this.state;
    const { onChange, onSave } = this;
    return (
      <div>
        <h1>Create Student Profile</h1>
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
          { errors.firstName }
          <div>Last Name</div>
          <input value={lastName} name='lastName' onChange={onChange} />
          { errors.lastName }
          <div>GPA</div>
          <input value={gpa} name='gpa' onChange={onChange} />
          { errors.gpa }
          <div>Email</div>
          <input value={email} name='email' onChange={onChange} />
          { errors.email }
          <br />
          <br />
          <button>Add Student</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history } ) => {

  return {
    saveStudent: (student) => dispatch(saveStudent(student, history)),

  };
};

export default connect(null, mapDispatchToProps)(StudentCreate);
