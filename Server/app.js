const express = require('express');
const bodyparser = require('body-parser');
const app = express();

//Middlewares
app.use(bodyparser.json());


//Import Routes
const postsRoute = require('./routes/post');
const userRoute = require('./routes/user');


app.use("/posts", postsRoute);
app.use("/user",userRoute);

module.exports= app;