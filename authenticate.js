const passport=require('passport');
const Localstratagy=require('passport-local').Strategy
const user=require('./modal/users');

exports.local=passport.use(new Localstratagy(
    //function to authenticate user
    //since passport plugin is used in user so it is very easy
    user.authenticate('local')
));