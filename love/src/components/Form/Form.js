import React, { useState,useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux'
import { createPost,updatePost } from '../../actions/post';
import {useSelector} from 'react-redux'

const Form = ({currentId,setCurrentId}) => {

  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const [postData,setPostData] = useState({creator : '',title : '',message : '',tags : '',selectedFile : ''})

  const classes = useStyles()
  const dispatch = useDispatch();


  useEffect(()=>{
    if(post) setPostData(post)
  },[post])


  const handleSubmit = (e)=>{
    e.preventDefault();
    
    if(currentId===0){
      dispatch(createPost(postData))
      clear();
    }else{
      dispatch(updatePost(currentId,postData))
      clear();
      //if have id then it means we are updating otherwise it means we are creating
    }
  }
  const clear = ()=>{
    setCurrentId(0);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  }

  return (
    <Paper className={classes.paper}>
    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant="h6">{`${currentId ? 'Editing' : 'Creating'} a Memory`}</Typography>

      <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} 
        // this will prevent the overriding of data cause we are updating specific field in object
      />
      <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} 
      onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

      <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

      <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

      <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

      <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>

      <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

    </form>
  </Paper>
  )
}

export default Form