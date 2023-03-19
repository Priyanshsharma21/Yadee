import React, { useState,useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux'
import { createPost,updatePost } from '../../actions/post';
import {useSelector} from 'react-redux'
import { DatePicker, Space } from 'antd';
import moment from 'moment'
import {Link,useNavigate} from 'react-router-dom'

const { RangePicker } = DatePicker;

const Form = ({currentId,setCurrentId}) => {

  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const [postData,setPostData] = useState({title : '',message : '',tags : '',selectedFile : '', eventDate : ''})

  const classes = useStyles()
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'))


  useEffect(()=>{
    if(post) setPostData(post)
  },[post])

  const onChange = (dateString) => {
    setPostData({...postData, eventDate : dateString})
    console.log('Formatted Selected Time: ', dateString._d);
  };
  const onOk = (value) => {
    console.log('onOk: ',moment(value._d).format('LLLL'));
  };


  const handleSubmit = (e)=>{
    e.preventDefault();
    
    if(currentId===0){
      dispatch(createPost({...postData, name : user?.result?.name },navigate))
      clear();
    }else{
      dispatch(updatePost(currentId,{...postData, name : user?.result?.name}))
      clear();
      //if have id then it means we are updating otherwise it means we are creating
    }

    navigate('/')
  }


  const clear = ()=>{
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '',eventDate : ''});
  }

  if(!user?.result?.name){
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={`${classes.paper} form_paper`}>
    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography className="make_me_style" variant="h6">{`${currentId ? 'Editing' : 'Creating'} a Event`}</Typography>

     
      <TextField className="make_me_style mmr" name="title" variant="outlined" label="Title" fullWidth value={postData.title} 
        // this will prevent the overriding of data cause we are updating specific field in object
      onChange={(e) => setPostData({ ...postData, title: e.target.value })} />

      <TextField className="make_me_style mmr" name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />

      <TextField className="make_me_style mmr" name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />

      <Space className="eventSpacer" direction="vertical" size={12}>
        <DatePicker className="event_date_picker mmr date_me make_me_style" showTime onChange={onChange} onOk={onOk} />
      </Space>


      <div className={`${classes.fileInput} file_make`}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

      <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>

      <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

    </form>
  </Paper>
  )
}

export default Form