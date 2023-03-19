import React from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography,ButtonBase } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {deletePost,likePost} from '../../../actions/post'
import {Link,useNavigate} from 'react-router-dom'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';




const Post = ({ post,setCurrentId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('profile'));


  const handleEditClick = (postId)=>{
    setCurrentId(postId)
    navigate('/create-event')
  }

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = ()=>{
    navigate(`/posts/${post._id}`);
  }

  // console.log(post)

  return (
    <Card className={classes.card} raised elevation={6}>
    <ButtonBase
     component="span"
      name="test"
      className={`${classes.cardAction} card_click_event`}
      onClick={openPost}
    >
   
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      
      <div className={classes.overlay}>
        <Typography className={classes.creator} variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&(
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" onClick={() => handleEditClick(post._id)}><MoreHorizIcon fontSize="default" /></Button>
        </div>
      )}
      
      <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" className={classes.tag_style} component="h2">
            {post.tags.map(tag=>(
              `#${tag} `
            ))}
          </Typography>
      </div>
      <Typography className={classes.eventDate} gutterBottom variant="h6" component="h6">Event Date - {moment(post.eventDate).format('LLLL')}</Typography>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>

      <CardContent>
        <Typography  variant="body2" color="textSecondary" className={classes.desc_style} component="p">{post.message}</Typography>
      </CardContent>
    </ButtonBase>
      <CardActions className={`${classes.cardActions} like_del`}>
      <Button size="small" color="primary" disabled={!user?.result} className={classes.like} onClick={() => {dispatch(likePost(post._id))}}>
        <Likes />
      </Button>

      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&(
        <Button size="small" color="primary" className={classes.del} onClick={() => {dispatch(deletePost(post._id))}}><DeleteIcon fontSize="small" /> Delete</Button>
      )}

      </CardActions>

    </Card>
  )
}

export default Post