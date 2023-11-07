const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()

mongoose.set('strictQuery',false)

// const uri="mongodb://127.0.0.1:27017/MyDatabase?retryWrites=true&w=majority"
const uri=`mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pass}@sahana.v2ancuf.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true})

const userSchema=new mongoose.Schema({
    username:{
        type:"String",
        required: true
    },
    password:{
        type:"String",
        required:true
    },
    tokens:[{
        token:{
            type:"String",
            required:true
        }
    }]
})
const itemSchema=new mongoose.Schema({
    product_name: {
        type:"String",
        required:true
    },
    product_detail:{
        type:"String",
        required: true
  },
    company_name: {
        type:"String",
        required: true
  },
    warranty: {
        type:"String"
  },
    mrp: {
        type:"String",
        required:true
  },
    price: {
        type:"String"
  },
    count: {
        type:"Number",
        required: true
  },
    images:[{
    image:{
        type: Buffer
    }
  }]
})

userSchema.statics.findByCredentials=async(username,password)=>{
    const user=await User.findOne({username})
    if(!user){
        throw new Error("You are not registered to Admin Portal")
    }
    const isMatch=await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error("Incorrect Password")
    }
    const token=await user.generateAuthToken()
    return token
}
userSchema.methods.generateAuthToken=async function(){
    const user=this
    const token=jwt.sign({_id: user._id},process.env.token_key)
    user.tokens= user.tokens.concat({token})
    await user.save()
    return token
}
const User=new mongoose.model("login",userSchema)
const Item=new mongoose.model("item",itemSchema)

const userLogin= User.findByCredentials

module.exports={userLogin,Item}