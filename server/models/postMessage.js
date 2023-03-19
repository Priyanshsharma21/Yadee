import mongoose from 'mongoose';

// create schema
const postSchema = mongoose.Schema({
    title : String,
    message : String,
    name : String,
    creator : String,
    tags : [String],
    selectedFile: String,
    likes : {
        type: [String],
        default : []
    },
    eventDate : {
        type : String,
        required : true
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
