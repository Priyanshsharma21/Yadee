import React, { useState } from 'react'
import useStyles from '../styles'
import { Container, AppBar, Typography, Grow, Grid,Paper, TextField, Button } from '@material-ui/core';
import Posts from '../components/Posts/Posts'
import Form from '../components/Form/Form'
import Paginate from '../components/main/Pagination'
import {getPostBySearch} from '../actions/post'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import { useDispatch } from 'react-redux';
function useQuery(){
  return new URLSearchParams(useLocation().search);
}


const Homepage = ({setCurrentId,currentId}) => {
    const classes = useStyles()
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const dispatch = useDispatch();
    
    const searchPost = ()=>{
      if(search.trim() || tags){
        // dispatch -> fetch search post
        dispatch(getPostBySearch({search, tags : tags.join(',')}))
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
      }else{
        navigate('/')
      }
    }

    const handleKeyPress = (e)=>{
      if(e.keyCode === 13){
        searchPost()
      }
    }

    const handleAddChip = (tag)=>{
      setTags([...tags, tag])
    }

    const handleDeleteChip = (tagToDelete)=>{
        setTags(tags.filter((tag)=> tag !== tagToDelete))
    }



  return (
    <Grow in>
        <Container maxWidth="xl">
          <Grid className={classes.mainContainer} container justify="center" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <AppBar className={`${classes.appBarSearch} search_me`} position="static" color="inherit">
                <TextField 
                  name="search"
                  variant="outlined"
                  label="Search Event's"
                  fullWidth
                  onKeyPress={handleKeyPress}
                  value={search}
                  className="search_inp"
                  onChange={(e)=>setSearch(e.target.value)}
                />

                <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                className="search_inp"
                variant="outlined"
                />
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>

                </AppBar>
                <Posts setCurrentId={setCurrentId}/>
                {(!searchQuery && !tags.length) &&(
                  <Paper className={`${classes.pagination} pagi_page`} elevation={6}>
                    <Paginate page={page} className={classes.pagination}/>
                  </Paper>
                )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Homepage