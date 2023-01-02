const mongoose= require("mongoose");

// const DB = process.env.DATABASE;

mongoose.connect("mongodb+srv://huzaifmalik:admin@cluster0.ga9sp.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Connection successful");
}).catch((err)=> console.log(err));
