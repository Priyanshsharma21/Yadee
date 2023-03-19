import mongoose from 'mongoose';

// create schema
const userSchema = mongoose.Schema({
    name : {type : String, required: true},
    email : {type : String, required: true},
    password : {type : String, required: true},
    isAdmin : {
        type : Boolean,
        required: true,
        default: false
    },
    id : {type:String}
})

//create model
const User = mongoose.model('User', userSchema);


// export model
export default User;
