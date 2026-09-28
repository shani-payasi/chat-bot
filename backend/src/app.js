const express= require('express');
const cors= require('cors');

const app =  express();
app.use(cors({
    origin: 'http://localhost:5174'
}));


module.exports= app;