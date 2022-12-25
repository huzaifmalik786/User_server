const express= require("express");
const mongoose= require("mongoose");
const cookieparser= require("cookie-parser");
const serverless= require("serverless-http");
const cors= require("cors");
const app=express();

app.use(cors());
app.use(cookieparser());

require('../db/conn');
app.use(express.json());

app.use('/.netlify/functions/app',require('../router/auth'));

module.exports= app;
module.exports.handler= serverless(app);