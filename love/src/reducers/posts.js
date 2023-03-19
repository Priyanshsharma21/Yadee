/* eslint-disable-next-line */
import {FETCH_ALL,CREATE,DELETE,LIKE,UPDATE,FETCH_BY_SEARCH, START_LOADING,END_LOADING,FETCH_POST} from '../constants/actionTypes'

export default (state = {isLoading : true, posts : []}, action) => {
  switch (action.type) {
    case START_LOADING:
      return {...state, isLoading : true}
    case END_LOADING:
      return {...state, isLoading : false}
    case FETCH_ALL:
      return {
        ...state,
        posts : action.payload.data,
        currentPage : action.payload.currentPage,
        numberOfPages : action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return {...state, posts : action.payload.data};
    case FETCH_POST:
      return {...state, post : action.payload.data};
    case CREATE:
      return {...state, posts : [...state.posts, action.payload]};
    case UPDATE:
    case LIKE :
      return {...state,posts :  state.posts.map((post)=>(post._id===action.payload._id ? action.payload : post))}
    case DELETE:
      return {...state,posts :  state.posts.filter((post)=>(post._id!==action.payload))}
    default:
      return state;
  }
};


//UPDATE - if post.id is equal to action.id means newid then show update version otherwise new one

// action is a pure object, whenever any change happen in ui this trigger action, this action obect have all the changes this send to reducer, reducer is a pure function which accept action and state, action have some type(fetch_post, create_post, update_post, delete_post) based on that type we perform some login
// state is always equal to something and we can name it anything like posts
