const passportLocalMongoose=require('passport-local-mongoose');
const mongoose =require('mongoose')
const user=mongoose.Schema({
    secret:{
        type:String,
        required:true
    }
})
user.plugin(passportLocalMongoose);
module.exports =mongoose.model('user',user);