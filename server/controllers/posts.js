import PostMessage from '../models/postMessage.js'
import mongoose from 'mongoose';

export const getPost = async(req,res)=>{
    try {
        //cause finding in db takes time : async
        const postMessage = await PostMessage.find();

        // if everything good then send data back
        res.status(200).json(postMessage)

    } catch (error) {
        //else show error json
        res.status(404).json({message : error.message})
    }
}

export const createPost = async(req,res)=>{
    const post = req.body; 
    // how we get post from frontend

    const newPost = new PostMessage(post) 
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
    const { title, message, creator, selectedFile, tags } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Post Of That ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

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

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Post Of That ${id}`);

    const post = await PostMessage.findById(id)

    const updatedPost = await PostMessage.findByIdAndUpdate(id,{likeCount : post.likeCount + 1},{new : true})

    res.json(updatedPost);
}








// This file have all the login of route and routes folder have only routes without login 