import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container,TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/main/index'
import { GoogleLogin,googleLogout  } from '@react-oauth/google';
import { createTheme, ThemeProvider, styled } from  '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux'
import jwt_decode from 'jwt-decode';
import {signin, signup} from '../actions/auth'



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const initialState = {
  firstName : '',
  lastName : '',
  email : '',
  password : '',
  confirmPassword : '',
  isAdmin : null,
}

const Auth = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [isAdminChecked, setIsAdminChecked] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
      e.preventDefault();

      const formDataWithAdmin = {
        ...formData,
        isAdmin: isAdminChecked
      }

      if(isSignUp){
        // for signUp form
        dispatch(signup(formDataWithAdmin, navigate))
      }else{
      // for login form
        dispatch(signin(formDataWithAdmin, navigate))
      }
    }

    const handleChange = (e)=>{
      setFormData({...formData, [e.target.name] : e.target.value })
    }

    const googleSuccess = async(res)=>{
      const decoded = jwt_decode(res?.credential);
      const token = res?.credential;
      const result = decoded
    // console.log(res)
      try {
        dispatch({type : 'AUTH', data : {result,token}})
        navigate('/')
      } catch (error) {
        console.log(error)
      }
  }

  const googleFailure = (error)=>{
    console.log(error)
    console.log("Google Sign In is unsuccessful try again later.")
  }

  const handleShowPassword = ()=>{
    setShowPassword((prev)=>!prev)
  }

 

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={10}>
         <ThemeProvider theme={darkTheme}>
         <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography className="auth_main-text"  component="h1" variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>

          <Grid container spacing={2}>
            {isSignUp &&(
              <>
              <Input className={classes.mui_inp} name="firstName" label="First Name" handleChange={handleChange} xs={6} />
              <Input className={classes.mui_inp} name="lastName" label="Last Name" handleChange={handleChange}  xs={6} />
              </>
            )}
            <Input className={classes.mui_inp} name="email" label="Email Address" handleChange={handleChange} type="email"/>

            <Input className={classes.mui_inp} name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
            { isSignUp && 
            <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }

            <div className="isAdmin">
            <div className="admin">Admin</div>
              <input name="isAdmin" label="Admin" checked={isAdminChecked} onChange={(e)=>setIsAdminChecked(e.target.checked)} type="checkbox" className="admin_or_not" /> 
            </div>
          </Grid>
          
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignUp ? 'Sign Up' : 'Sign In' }
          </Button>

        <div className="google_login">
          <GoogleLogin
            onSuccess={googleSuccess}
            onError={googleFailure}
            cookiePolicy="single_host_origin"
            scope="profile"
            className="g_btn"
          />
        </div>

          <Grid container justify="flex-end">
            <Grid item>
              <Button className="auth_main-text" onClick={()=>setIsSignUp(prev=>!prev)}>
                { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>

          </form>
         </ThemeProvider>
        </Paper>
      </Container>  
    </div>
  )
}

export default Auth