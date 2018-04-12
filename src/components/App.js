import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav';
import Home from './Home';
import Students from './Students';
import Campuses from './Campuses';
import Campus from './Campus';
import CampusForm from './CampusForm';
import Student from './Student';
import StudentCreate from './StudentCreate';
import StudentUpdate from './StudentUpdate';

import { loadStudents } from '../redux/students';
import { loadCampuses } from '../redux/campuses';

class App extends Component {
  componentDidMount() {
    this.props.loadStudents();
    this.props.loadCampuses();

  }
  render() {

    return (
      <Router>
        <div>
          <Nav />
          <Route path='/' exact component={Home} />
          <Route path='/students' exact component={Students} />
          <Route path='/campuses' exact component={Campuses} />
          <Switch>
            <Route path='/campuses/create' exact component={CampusForm } />
            <Route path='/students/create' exact component={StudentCreate} />
            <Route path='/campuses/:id' exact render={({ match }) => <Campus id={match.params.id * 1} />} />
            <Route path='/students/:id' exact render={({ match, history }) => <Student history={history} id={match.params.id * 1} />} />
            <Route path='/students/update/:id' exact render={({ match, history }) => <StudentUpdate history={history} id={match.params.id * 1} />} />
            <Route path='/campuses/update/:id' exact render={({ match, history }) => <CampusForm history={history} id={match.params.id * 1} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispacthToProps = (dispatch) => {
  return {
    loadStudents: () => dispatch(loadStudents()),
    loadCampuses: () => dispatch(loadCampuses())
  };
};

export default connect(null, mapDispacthToProps)(App);
