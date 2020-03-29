const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex')({
    client: 'pg',
    connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'test',
    database: 'face_recognition'
    }
});

const signin = require('./Controllers/signin');
const register = require('./Controllers/register');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    knex.select('*').from('users')
        .then(users => res.json(users));
});

app.post("/signin", signin.handleSignin(knex, bcrypt));
app.post("/register", register.handleRegister(knex, bcrypt));
app.get("/profile/:id", profile.handleProfile(knex));
app.put("/image", image.handleImage(knex));
app.post("/imageURL", (req, res) => image.handleAPICall(req, res));

app.listen(3001,() => {
    console.log("App is running on port 3001.");
});