const express= require('express');
const cors= require('cors');

const app =  express();
app.use(cors({
  origin: ['http://localhost:5174',"https://chat-bot-gof7.vercel.app"],
  allowedHeaders :['content-type' , 'Authorization'],
  credentials:true
}));


module.exports= app;