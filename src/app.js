const express= require("express");
const mongoose= require("mongoose");
const dotenv=require("dotenv");
const cookieparser= require("cookie-parser");
const serverless= require("serverless-http");
const app=express();
app.use(cookieparser());

dotenv.config({path:"../.env"});

require('../db/conn');
app.use(express.json());

app.use('/.netlify/functions/app',require('../router/auth'));

module.exports= app;
module.exports.handler= serverless(app);