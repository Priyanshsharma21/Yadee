// import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import {FETCH_ALL,CREATE,DELETE,LIKE,UPDATE} from '../constants/actionTypes'

export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
    case LIKE :
      return posts.map((post)=>(post._id===action.payload._id ? action.payload : post))
    case DELETE:
      return posts.filter((post)=>(post._id!==action.payload))
    default:
      return posts;
  }
};


//UPDATE - if post.id is equal to action.id means newid then show update version otherwise new one

// action is a pure object, whenever any change happen in ui this trigger action, this action obect have all the changes this send to reducer, reducer is a pure function which accept action and state, action have some type(fetch_post, create_post, update_post, delete_post) based on that type we perform some login
// state is always equal to something and we can name it anything like posts
