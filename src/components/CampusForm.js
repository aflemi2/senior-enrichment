import React, { Component } from 'react';
import { connect } from 'react-redux';

class CampusForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.campus ? this.props.campus.name : 'Enter Name Here',
      address: '123 fake street',
      image: 'imageURL',
      description: 'yadda, yadda, yadda'
    };
    this.onSave = this.onSave.bind(this);
    this.onChange =this.onChange.bind(this);

  }
  onSave(ev){
    ev.preventDefault();
    this.props.onCreateCampus({name: this.state.name});
  }

  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value});
  }

  componentWillReceiveProps(nextProps){
    this.setState({ name: nextProps.campus ? nextProps.campus.name : ''});
  }


  render(){
    const { campus, students } = this.props;
    const { name, address, image, description } = this.state;
    const { onSave, onChange } = this;
    return (
      <div>
      <form onSubmit = { onSave }>
        <div> Campus Name </div>
        <input value={ name } name= 'name' onChange = { onChange } />
        <div> Campus Location </div>
        <input value={ address } name= 'address' onChange = { onChange } />
        <div> Campus Image URL </div>
        <input value={ image } name= 'image' onChange = { onChange } />
        <div> Campus Description</div>
        <input value={ description } name= 'description' onChange = { onChange } />
        <button disabled={ name.length === 0}>Save Changes</button>
      </form>
      <h3>Students on Campus</h3>
      <select>
        <option>students</option>
      </select>
      </div>
    );
  }
}

const mapStateToProps = ({ campuses, students}, {id})=> {
  return {
    campuses,
    students
  };
};

export default connect(mapStateToProps)(CampusForm);

