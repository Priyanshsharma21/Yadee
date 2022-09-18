import React from 'react'
import {Grid, CircularProgress} from '@material-ui/core'
import Post from './Post/Post'
import {useSelector} from 'react-redux'
import useStyles from './styles'

const Posts = ({setCurrentId}) => {
  const posts = useSelector((state)=>state.posts)
  const classes = useStyles()

  

  // to retrive the data we have useSelector hook this hook accept callback which have access to whole global state we cn return the state amd store it in variable


  return (
    !posts.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map(post=>(
          <Grid key={post._id} item xs={12} sm={6}>
              <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
    
  )
}

export default Posts