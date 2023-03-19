import * as api from '../api'
import { AUTH } from '../constants/actionTypes'

export const signin = (formData, navigate)=> async(dispatch)=>{
    try {
        //login the user
        const { data } = await api.signIn(formData);

        dispatch({type : AUTH, data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}

export const signup = (formData, navigate)=> async(dispatch)=>{
    try {
        //signUp(register) the user
        const { data } = await api.signUp(formData);

        dispatch({type : AUTH, data})

        navigate('/')
    } catch (error) {
        console.log(error)
    }
}



// Whole flow -> Enter data from form in frontend, in onSubmit we have dispatch the data we have filled, post and user(fName, lName, email, password, confirmPassword) data, this comes to action->auth.js, now we are making the api request here to signin and signup whose endpoint present in api->index.js, we post data and then in return we get the {data} that we destructure

// Now we dispatch this data to reducer by passing the type and payload
