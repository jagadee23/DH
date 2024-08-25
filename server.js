const express = require('express');
const mongoose = require('mongoose');
const devuser = require('./devusermodel');
const jwt = require('jsonwebtoken');
const middleware = require('./middleware');
const reviewmodel = require('./reviewmodel');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://user:user@cluster0.2xjf283.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB Connected"));


app.use(express.json());
app.use(cors({origin:'*'}));

app.get('/',(req,res)=>{
    return res.send('Hello world');
})

app.post('/register',async(req,res)=>{
    try{
      const {fullname,email,mobile,skill,password,confirmpassword} = req.body;
      const exist = await devuser.findOne({email});
      if(exist){
        return res.status(400).send('User Already Registered');
      }
      if(password !== confirmpassword){
        return res.status(400).send('Password and Confirm Password are not matching');
      }
      let newUser = new devuser({
        fullname, email, mobile, skill, password, confirmpassword
      })
      newUser.save();
      return res.status(200).send('User Registered Successfully');
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

app.post('/login',async(req,res)=>{
    try{
      const {email,password} = req.body;
      const exist = await devuser.findOne({email});
      if(!exist){
        return res.status(400).send('User Not Registered');
      }
      if(exist.password!=password){
        return res.status(400).send('Password is incorrect');
      }
      let payload ={
        user:{
            id : exist.id
        }
      }
      jwt.sign(payload,'jwtPassword',{expiresIn:3600000},
      (err,token)=>{
         if(err) throw err
         return res.json({token:token})
      }
    )
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

app.get('./allprofiles',middleware,async(req,res)=>{
    try{
       let allprofiles = await devuser.find();
       return res.json(allprofiles);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

app.get('./myprofile',middleware,async(req,res)=>{
    try{
         let user = await devuser.findById(req.user.id);
         return res.json(user);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

app.post('./addreview',middleware,async(req,res)=>{
    try{
         const {taskworker,rating} = req.body;
         const exist = await devuser.findById(req.user.id);
         if(!exist){
          return res.status(400).send('User not found');
         }
         const newreview = new UserReview ({
          taskprovider:exist.fullname,
          taskworker,rating
         })
         newreview.save();
         return res.status(200).send('Review Updated Successfully');
         
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
    }
})

app.get('/myreview',middleware,async(req,res)=>{
  try{
      let allreviews = await reviewmodel.find();
      let myreviews = allreview.filter(review => review.taskworker.toString() == req.user.id.toString());
      return res.status(200).json(myreviews);
    }
  catch(err){
    console.log(err);
    return res.status(500).send('Server Error');
  }
})
app.listen(5000,()=>console.log('Server running...'))