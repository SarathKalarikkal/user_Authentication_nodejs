const asyncHandler = require('express-async-handler')
const User  =  require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//desc reigster user
//route POST /api/users/register
//access public
const registerUser = asyncHandler(async(req, res)=>{

   const {userName, email, password} = req.body

   //checking the fields are not empty
   if(!userName || !email || !password){
      res.status(400)
      throw new Error("All field are mandatory")
   }

   //checking whether user in already available
   const userAvailable = await User.findOne({email})

   if(userAvailable){
    res.status(400)
      throw new Error("User is already exist")
   }

   //hashing the password using bcrypt
   const hashedPassword = await bcrypt.hash(password, 10)
   console.log(hashedPassword);

   //creating a new user
   const user = await User.create({
    userName,
    email,
    password : hashedPassword
   })

   //if user is created, show only id and email
   if(user){
    res.status(200).json({_id : user.id, email:user.email})
   }else{
    res.status(400)
    throw new Error("User data is not valid")
   }

    res.json("Register user")
})




//desc login user
//route POST /api/users/login
//access public
const loginUser = asyncHandler(async(req, res)=>{

    const {email, password} = req.body

    //checking the fields are not empty
   if(!email || !password ){
    res.status(400)
    throw new Error("All field are mandatory")
 }

 //checking the user is available
 const user = await User.findOne({email})

 //if cuser is available, the compare the password and already user set password
 if(user && await bcrypt.compare(password, user.password)){

    //jsonwebtoken setting to accesstoken and expires in 1m
   const accessToken = jwt.sign({
     user : {
        id : user.id,
        userName : user.userName,
        email : user.email,
     }
   },
   process.env.ACCESS_TOKEN_SECRETE,
   {expiresIn : "3m"}
   )

    res.status(200).json({accessToken})

 }else{
    res.status(400)
    throw new Error("email or password is not valid")
 }

})


//desc current user info
//route GET /api/users/login
//access private
const currentUser = asyncHandler(async(req, res)=>{
    const user = req.user
    res.json(user)
})

module.exports ={registerUser, loginUser,currentUser}