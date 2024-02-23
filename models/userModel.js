const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        require : [true, "Please add the name"]
    },
    email : {
        type : String,
        require : [true, "Please add the user email address"],
        unique : [true, "Email address is already taken"]
    },
    password : {
        type : String,
        require : [true, "Please add the user Password"]
    },
},{
    timestamps : true
})

module.exports = mongoose.model("user", userSchema)