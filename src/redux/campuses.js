import axios from 'axios';

//Action Types
const SET_CAMPUSES = 'SET_CAMPUSES';
//Action Creators

//campusesReducer
export default (state = [], action)=> {
  switch(action.type){
    case SET_CAMPUSES:
    state = action.campuses;
    break;
  }
  return state;
};

//Thunk Creators
export const loadCampuses = ()=> {
  return (dispatch)=> {
    return axios.get('/api/campuses')
    .then( result => result.data)
    .then( campuses => dispatch({
      type: SET_CAMPUSES,
      campuses
      })
    );
  };
};
