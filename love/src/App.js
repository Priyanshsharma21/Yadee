import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import memories from '../src/images/memories.png'
import Form from './components/Form/Form'
import Posts from './components/Posts/Posts'
import useStyles from './styles'
import {getPosts} from './actions/post'
import {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';

function App() {
  const [currentId, setCurrentId] = useState(0)
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch,currentId])


  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="logo" height="60" />
      </AppBar>

      <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
                <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
