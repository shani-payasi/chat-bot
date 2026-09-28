const express= require('express');
const cors= require('cors');

const app =  express();
app.use(cors({
  origin: ['http://localhost:5174',"https://chat-bot-five-gilt.vercel.app/"]
}));


module.exports= app;