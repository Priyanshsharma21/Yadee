import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from '../../pages/styles';


const Input = ({half,handleChange,name,label,type,autoFocus,handleShowPassword}) => {
  const classes = useStyles()


  return (
    <Grid xs={6} md={half ? 6 : 12}>
        <TextField 
        className={classes.mui_inp} 
        name={name} label={label} 
        onChange={handleChange} 
        xs={6} 
        variant="outlined" 
        required
        type={type}
        // className="all_inp"
        autoFocus={autoFocus}
        InputProps={name === 'password' ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
              {type === 'password' ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      } : null}
        />
    </Grid>
  )
}

export default Input