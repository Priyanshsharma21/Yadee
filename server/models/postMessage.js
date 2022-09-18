import mongoose from 'mongoose';

// create schema
const postSchema = mongoose.Schema({
    title : String,
    message : String,
    creator : String,
    tags : [String],
    selectedFile: String,
    likeCount : {
        type: Number,
        default : 0
    },
    createdAt : { 
        type : Date, 
        default : new Date()
    }
})

//create model
const PostMessage = mongoose.model('PostMessage', postSchema);


// export model
export default PostMessage;