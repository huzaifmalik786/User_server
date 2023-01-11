const express= require('express');
const router= express.Router();
const bcrypt= require('bcryptjs');
const authenticate= require('./authenticate.js');

require("../db/conn");
const User= require("../model/userSchema");

router.get('/', (req,res)=>{
    res.send("Hello world from the server")
})

router.get("/logout", (req,res)=>{
    res.clearCookie("jwtoken", {path:'/'});
    res.status(200).send("User Logged Out.");
})

router.post('/register', (req,res)=>{
    const {name, email, phone, work, password, cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({message: "Please fill the fields properly!"})
    }
    User.findOne({email: email})
    .then((userExist)=>{
        if(userExist){
            return res.status(422).json({message: "Email already exist!"});
        }
        else if(password != cpassword){
            return res.status(422).json({message: "Passwords do not match!"})
        }
        const user= new User({name, email, phone, work, password, cpassword});
        user.save().then(()=>{
            res.status(201).json({error: "User registered successfully."})
        }).catch((err)=>{
            res.status(201).json({error: "Failed to register!"});
        })
    }).catch((err)=>{
        console.log(err);
    })
});

router.post("/login",async (req,res)=>{

    try{
        const {email, password}= req.body;
        if(!email || !password){
            return res.status(400).json({message: "Please fill the data properly!"});
        }
        const userLogin=await User.findOne({email: email});

        if(!userLogin){
            res.status(400).json({message: "Invalid Credentials"})
        }
        else{ 

            const isMatch= await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() +25892000000),
                httpOnly: true
            })
            
            if(isMatch){
                res.json({error: "User logged in successfully."})
            }
            else{
                res.status(400).json({message: "Invalid Credentials!"})
            }
        }
    } catch(err){
        console.log(err);
    }
})

router.get("/getdata",authenticate, (req,res)=>{
    console.log("authentication successful");
    res.send(req.rootUser);
})

module.exports = router;
