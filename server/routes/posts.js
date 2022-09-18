import express from 'express';
import {getPost,createPost,updatePost,deletePost,likePost} from '../controllers/posts.js'
//import posts.js is imp in nodejs not in react

const router = express.Router();

router.get('/', getPost)
router.post('/',createPost)
router.patch('/:id',updatePost)
router.delete('/:id',deletePost)
router.patch('/:id/likePost',likePost)

export default router
