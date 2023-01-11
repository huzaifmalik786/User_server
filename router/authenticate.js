const jwt= require('jsonwebtoken');
const User= require('../model/userSchema');

const authenticate= async(req, res, next) => {
    try{
        const token= req.cookies.jwtoken;
        console.log(token);
        const verify= jwt.verify(token,"HUZAIF");
        const rootUser= await User.findOne({_id: verify._id, "tokens.token": token});
        if(!rootUser){
            throw new Error("User not Found!");
        }
        req.rootUser= rootUser;
        next();
    } catch(err){
        res.status(401).send("Unauthorized User!");
        console.log(err);
    }   
}
module.exports = authenticate;