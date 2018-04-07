import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import { connect } from 'react-redux';
import { loadStudents } from '../redux/students';
import { loadCampuses } from '../redux/campuses';

class App extends Component{
  componentDidMount(){
    this.props.loadStudents();
    this.props.loadCampuses();

  }
  render(){

    return (
      <Router>
        <div>
          <Nav />
          <Route path='/' exact component = { Home } />
        </div>
      </Router>
    );
  }
}

const mapDispacthToProps = (dispatch)=> {
  return {
    loadStudents: ()=> dispatch(loadStudents()),
    loadCampuses: ()=> dispatch(loadCampuses())
  };
};

export default connect(null, mapDispacthToProps)(App);
