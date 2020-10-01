var express = require('express');
var qrcode=require('qrcode')
var bodyParser=require('body-parser')
var speakeasy=require('speakeasy')
var passport=require('passport')
var router = express.Router();
const User=require('../modal/users')

router.get('/',(req,res)=>{
  User.find({})
  .then((user)=>{
    res.send(user)
  })
})

router.post('/add_user',(req,res,next)=>{
  var secret=speakeasy.generateSecret({
    name:'harodu',
    length:20
  })
  User.register({
    username:req.body.username,
    secret:secret.base32
  },req.body.password,(err,user)=>{
    if(err)
      next(err)
    else{
      qrcode.toDataURL(secret.otpauth_url,(err,data)=>{
        if(err)
          res.send({err:err})
        else{
          res.setHeader('content-type','text/html')
          res.send('<img src="' + data + '">')
        }
      })
    }
  })

  
})
router.post('/login',(req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{
    if(err)
      res.status(500).send(err);
    else if(info)
      res.send({err:"Wrong credentials",info:info})
    else{
      var verified=speakeasy.totp.verify({
        secret:user.secret,
        encoding:"base32",
        token:req.body.token
      })
      if(verified==true)
        res.send({user:user, status: 'You are logged in!'})
      else{
        req.user=undefined;
        res.send({err:"Wrong credentials"})
      }
    }
  })(req,res,next); 
})
module.exports = router;
