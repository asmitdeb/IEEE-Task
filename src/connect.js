const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/SignupPage");
connect.then(() => {
    console.log("Database connected successfully");
})

.catch(() => {
    console.log("Cannot connect to databse");
});

const SigninSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users", SigninSchema);

module.exports = collection;