const express =require('express');
const router= require ('./src/routes/api');
const app= new express ();
const path = require("path");

// Security Middleware
const rateLimit=require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize=require ('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');
const cors=require('cors');
const cookieParser = require('cookie-parser');


//Database 
const mongoose= require('mongoose');

let URL="mongodb+srv://<username>:<password>@cluster0.wtapjxr.mongodb.net/Book";
let option={user:'majaharulr1',pass:"majaharulr1234",autoIndex:true};

mongoose.connect(URL,option).then((res)=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(err)
})



// security Middleware Implement
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Rate Limiter

const limiter=rateLimit({windowMs:15*60*100,max:3000})




// Managing  BackEnd API routing 

app.use("/api/v1",router)


module.exports=app;



