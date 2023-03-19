import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getPosts } from '../../actions/post';
import useStyles from './styles';

const Paginate = ({page}) => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector((state)=>state.posts)

    useEffect(()=>{
        if(page) dispatch(getPosts(page))
    },[page,dispatch])

  return (
    <div>
        <Pagination 
            classes={`${classes.ul} main_pagi`}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outline"
            color="primary"
            renderItem={(item)=>(
                <PaginationItem 
                    {...item}
                    component={Link}
                    to={`/posts?page=${item.page}`}
                />
            )}
        />
    </div>
  )
}

export default Paginate