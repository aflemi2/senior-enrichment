import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveCampus, deleteCampus } from '../redux/campuses';

class CampusForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: this.props.campus ? this.props.campus.name : '',
      address: this.props.campus ? this.props.campus.address : '',
      description: this.props.campus ? this.props.campus.description : '',
      error: null
    };
    this.onSave = this.onSave.bind(this);
    this.onChange =this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(){
    this.props.deleteCampus({ id: this.props.id });
  }

  onSave(ev){
    ev.preventDefault();
    const campus = {
      id: this.props.id,
      name: this.state.name,
      description: this.state.description
    };
    this.props.saveCampus(campus);
  }

  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value});
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.campus){
      this.setState({
        id: nextProps.campus.id,
        name: nextProps.campus.name,
        description: nextProps.campus.description
      });
    }
  }

  render(){
    const { campus, students, id } = this.props;
    const { name, address, description } = this.state;
    const { onSave, onChange, onDelete } = this;
    if(!id){
      return (
        <div>
        <div>CREATE CAMPUS</div>
        <form onSubmit = { onSave }>
        <div> Campus Name </div>
        <input value={ name } name= 'name' onChange = { onChange } />
        <div> Campus Location </div>
        <input value={ address } name= 'address' onChange = { onChange } />
        <div> Campus Description</div>
        <textarea value={ description } name= 'description' onChange = { onChange } />
        <button disabled={ name.length === 0}>Add Campus</button>
      </form>
      </div>
      );
    }
    return (
      <div>
      <form onSubmit = { onSave }>
        <div> Campus Name </div>
        <input value={ name } name= 'name' onChange = { onChange } />
        <div> Campus Location </div>
        <input value={ address } name= 'address' onChange = { onChange } />
        <div> Campus Description</div>
        <textarea value={ description } name= 'description' onChange = { onChange } />
        <button disabled={ name.length === 0}>Save Changes</button>
        <button onClick={ onDelete }>Delete Campus</button>
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
    id,
    campuses,
    students
  };
};

export default connect(mapStateToProps)(CampusForm);

