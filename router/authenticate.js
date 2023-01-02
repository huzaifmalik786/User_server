const jwt= require('jsonwebtoken');
const User= require('../model/userSchema');

const authenticate= async(req, res, next) => {
    try{
        const token= req.cookies.jwtoken;
        const verify= jwt.verify(token,"HUZAIFMALIKJAMIAMILIAISLAMIA");
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
