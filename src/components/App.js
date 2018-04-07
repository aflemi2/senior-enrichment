import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Students from './Students';
import Campuses from './Campuses';
import Campus from './Campus';
import Student from './Student';
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
          <Route path='/students' exact component = { Students } />
          <Route path='/campuses' exact component = { Campuses } />
          <Route path='/campuses/:id' exact render = {({ match })=> <Campus id= { match.params.id*1 } />} />
          <Route path='/students/:id' exact render = {({ match })=> <Student id= { match.params.id*1 } />} />
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
