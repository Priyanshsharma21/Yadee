import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose';

export const getPosts = async(req,res)=>{
    const { page } = req.query;

    try {
        const LIMIT = 6;
        const startIndex = (Number(page)- 1) * LIMIT;
        const total = await PostMessage.countDocuments({})
        //cause finding in db takes time : async
        const posts = await PostMessage.find().sort({_id : -1}).limit(LIMIT).skip(startIndex);

        // if everything good then send data back
        res.status(200).json({data : posts, currentPage : Number(page), numberOfPages : Math.ceil(total/LIMIT)});

    } catch (error) {
        //else show error json
        res.status(404).json({message : error.message})
    }
}


export const getPost = async(req,res)=>{
    const { id } = req.params;
    // console.log({id})

    try {
        const post = await PostMessage.findById(id);

        // if everything good then send data back
        res.status(200).json({data : post})

    } catch (error) {
        //else show error json
        res.status(404).json({message : error.message})
    }
}

export const getPostsBySearch = async (req,res)=>{
    const{searchQuery, tags} = req.query
    try {
        const title = new RegExp(searchQuery, 'i');

        const posts = await PostMessage.find({$or : [{title},{tags : {$in : tags.split(',')}}]})

        res.status(200).json({data : posts})
    } catch (error) {
        res.status(404).json({message : error.message})
    }
}

// Query -> /posts?page=1
//Params -> /posts/123

export const createPost = async(req,res)=>{
    const post = req.body; 
    // how we get post from frontend

    const newPost = new PostMessage({...post, creator : req.userId, createdAt : new Date().toISOString()}) 
    // creating new doc from PostMessage model

    try {
        await newPost.save() 
        // saving it to mongo atlas

        res.status(200).json(newPost) 
        //sending response back to frontend with status 200

    } catch (error) {
        res.status(409).json({message : error.message}) 
        // else error
    }
}

// /post/123 
export const updatePost = async(req,res)=>{
    const {id} = req.params;
    const { title, message, creator, selectedFile, tags,eventDate } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Post Of That ${id}`);

    const updatedPost = { creator, title,eventDate, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, {new : true})

    res.json(updatedPost);
}

export const deletePost = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Post Of That ${id}`);

    await PostMessage.findByIdAndRemove(id)

    res.json({message : "Post Deleted Successfully"});
}


export const likePost = async(req,res)=>{
    const {id} = req.params;

    if(!req.userId) return res.json({message : 'Unauthorized user'})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Post Of That ${id}`);

    const post = await PostMessage.findById(id)

    const index = post.likes.findIndex((id)=> id===String(req.userId)) // if true then it will be a dislike cause user already liked the post

    if(index === -1){
        // it means user click for like 
        post.likes.push(req.userId)
    }else{
        //it means user click for removing the like,or dislike
        post.likes = post.likes.filter((id)=> id !== String(req.userId))
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id,post,{new : true})

    res.json(updatedPost);
}








// This file have all the login of route and routes folder have only routes without login 