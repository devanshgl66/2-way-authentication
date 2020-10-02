const passport=require('passport');
const Localstratagy=require('passport-local').Strategy
const user=require('./modal/users');
const GoogleStrategy=require('passport-google-oauth20').Strategy 
exports.local=passport.use(new Localstratagy(
    //function to authenticate user
    //since passport plugin is used in user so it is very easy
    user.authenticate('local')
));

exports.google=passport.use(new GoogleStrategy({
    clientID:     "738534549743-rrrauk7ae3epa6gsu755ubrs0nd0k4l2.apps.googleusercontent.com",
    clientSecret: "Gk5wWwfaL23-UVGmyiQYzMOh",
    callbackURL: "/users/auth/google/callback",
    passReqToCallback   : true
  },
  function(req, accessToken, refreshToken, profile, done) {
      req.accessToken=accessToken
      req.refreshToken=refreshToken
      req.profile=profile
    //   console.log('hlo')
    //   console.log(req)
      done(null,{profile:profile})
    // done()

  }
));