const express = require('express');
const path = require('path');
const collection = require('./connect');

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.urlencoded({extended: false}));
// app.use(express.static(__dirname + '/../public'));

app.get("/", (req, res) => {
    res.sendFile('public/signin.html', {root: './'})
});

app.use(express.static(__dirname + '/../public'));
app.get("/signup", (req, res) => {
    res.sendFile('public/signup.html', {root: './'})
});

//Signup
app.post("/signup", async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.pass
    }
    
    const userExists = await collection.findOne({email: data.email});
    
    if(userExists){
        res.send("Account already exists");
    }
    else{
        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

});

//Signin
app.post("/login", async (req, res) => {
    try{
        const check = await collection.findOne({email: req.body.email});
        if(!check){
            res.send("User not found");
        }
        else{
        const equals = (req.body.pass === check.password);
        if(equals){
            res.send("Login successful!");
        }
        else{
            res.send("Wrong Password");
        }}
    }catch{
        res.send("Wrong Details");
    }
});

app.listen(port, () => {
    console.log('Server running on port: ${port}');
})