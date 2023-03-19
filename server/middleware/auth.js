import jwt from 'jsonwebtoken'

export const auth = (req,res,next)=>{
    try {
        // when user signUp he will check he can add delete item, for that we have to check that he is authorised for that route or not
        // this is the stuff that happen between req and res

        const token = req.headers.authorization.split(" ")[1];
        //now this token can come from google auth and also from us
        // if token length is less than 500 then our's token, if greater then not ours
        const isCustomAuth = token.length < 500;

        let decodedData;
        if(token && isCustomAuth){
            decodedData = jwt.verify(token, 'ipsEvent');

            req.userId = decodedData?.id
        }else{
            // google login data
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error)
    }
}

//  default auth;


// How things works ->
// 1. user like a post, so we have check wether they have permission to do so, for that we will check the auth middleware so if all of the stuff in middleware is correct then we will call next and it means everything is fine and then we move to like middleware, so middleware basically happen between req,res and tells our frontend and backend to reflect or not (it means user is authorized or not)  