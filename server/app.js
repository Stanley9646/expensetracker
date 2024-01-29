const express = require("express");
const db = require('./db/db')
const cors =require ('cors');
const {readdirSync } = require('fs')
require('dotenv').config();

const app= express();
//const crypto = require('crypto');

// const randomString = crypto.randomBytes(64).toString('hex');
// console.log(randomString);


//middlewares 
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1' , require(`./routes/` + route)))

const port = process.env.port

const server = () => {
    db()
    app.listen (port , console.log(`Listening to port ${port}`))
}

server();


