import axios from 'axios';

//Action Types
const SET_STUDENTS = 'SET_STUDENTS';
//Action Creators
//Reducer
//Thunk Creators

export default (state = [], action)=> {
  switch(action.type){
    case SET_STUDENTS:
    state = action.students;
    break;
  }
  return state;
};

export const loadStudents = ()=> {
  return (dispatch)=> {
    return axios.get('/api/students')
    .then( result => result.data)
    .then( students => dispatch({
      type: SET_STUDENTS,
      students
      })
    );
  };
};


