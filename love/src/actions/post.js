import * as api from '../api'
import {FETCH_ALL,CREATE,DELETE,LIKE,UPDATE,FETCH_BY_SEARCH,START_LOADING,END_LOADING,FETCH_POST} from '../constants/actionTypes'


//Action creator
export const getPosts = (page)=> async(dispatch)=>{
    try {
        dispatch({type : START_LOADING})
        const {data} = await api.fetchPosts(page);
        dispatch({type : FETCH_ALL, payload : data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error.message)
    }
}

export const getPost = (id)=> async(dispatch)=>{
    try {
        dispatch({type : START_LOADING})
        const {data} = await api.fetchPost(id);
        // console.log(id)
        dispatch({type : FETCH_POST, payload : data})
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error.message)
    }
}



export const getPostBySearch = (searchQuery)=> async(dispatch)=>{
    try {
        dispatch({type : START_LOADING})
        const { data:{data} } = await api.fetchPostsBySearch(searchQuery)

        dispatch({type : FETCH_BY_SEARCH, payload : data})
        dispatch({type:END_LOADING})

        // console.log(data)

    } catch (error) {
        console.log(error)
    }
}


export const createPost = (post,navigate)=> async(dispatch)=>{
    try {
        dispatch({type : START_LOADING})
        const {data} = await api.createPost(post)
        navigate(`/posts/${data._id}`)

        dispatch({type : CREATE, payload:data})
        dispatch({type:END_LOADING})

    } catch (error) {
        console.log(error)
    }
}

export const updatePost = (id, post)=> async(dispatch)=>{
    try {
        const {data} = await api.updatePost(id,post)

        dispatch({type : UPDATE, payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const deletePost = (id)=> async(dispatch)=>{
    try {
        await api.deletePost(id)
        dispatch({type : DELETE, payload:id})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id)=> async(dispatch)=>{
    try {
        const {data} = await api.likePost(id)

        dispatch({type : LIKE, payload:data})
    } catch (error) {
        console.log(error)
    }
}


// action creators are function that return action 
// action is a pure object which has type and payload
// as we are dealing with async logic we have to put async infront of function

// action is a pure object, whenever any change happen in ui this trigger action, this action obect have all the changes this send to reducer, reducer is a pure function which accept action and state, this reducer goes to store which contain state and tell it to update changes which are given according to action



// Till Now ->
// 1. I have setup my backend -> 1. create basic express server ->2. at mongo atlas create cluster, create database user and in cluster i connect to application, copy url and paste user name and password ->3. I have donw mongoose.connect and connect it to localhost server
// then I have create routes which have only routed like getpost route and createpost route, its functionality is insifde controller
// 4. Now inside models i have made post schema and mongoose model and export it 
// 5. Inside the controller ew have createpost to create post (post req) with req.body i resived post data, then i have created new post and then save it and return json to frontend, get post is just searching post in database, if find then return json


// In frontend, i created post and form
// in indexjs i imported 
// import { Provider } from 'react-redux'
// provider which will provide all state to all the components of app

// import { createStore, applyMiddleware, compose } from 'redux'
// const store = createStore(reducers, compose(applyMiddleware(thunk)))
// 
// import thunk from 'redux-thunk'
// import reducers from './reducers'

{/* <Provider store={store}>
        <App />
    </Provider> */}

    // Now we have action 
    // action is a object which have type and payload 
    // Everycomponent can duispatch action which have type and payload to update state
    // this action send to reducer 
// Now in reducer 
// import { combineReducers } from 'redux'
// this will combine all child state and combine it to one single state
// export default (posts=[],action)=>{

//     switch(action.type){
//         case 'FETCH_ALL':
//             return posts;
//         case 'CRETAE':
//             return posts;

//         default:
//             return posts;
//     }

// }

// in reducer on the basis of action like fetchall update, create,delete, search
// we perform some logic



















