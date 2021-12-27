const express = require('express');
const bodyparser = require('body-parser');
const app = express();

//Middlewares
app.use(bodyparser.json());


//Import Routes
const postsRoute = require('./routes/post');


app.use("/posts", postsRoute);

module.exports= app;