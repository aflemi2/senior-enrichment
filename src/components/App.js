import React, { Component } from 'react';
import Nav from './Nav';
import { connect } from 'react-redux';
import { loadStudents } from '../redux/students';

class App extends Component{
  componentDidMount(){
    this.props.loadStudents();
  }
  render(){
    return (
        <Nav />
    );
  }
}

const mapDispacthToProps = (dispatch)=> {
  return {
    loadStudents: ()=> dispatch(loadStudents())
  };
};

export default connect(null, mapDispacthToProps)(App);
