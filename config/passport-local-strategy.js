const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    
    async function(email, password, done){
        //find a user and establish the identity
      const user = await User.findOne({email: email}).exec();

      if(err){
        console.log('Error in finding user --> Passport');
        return done(err);
      }

      if(!user || user.password != password){
        console.log('Invalid Username/ Password');
        return done(null, false);
      }

      return done(null, user);
    }
));


// serializing the user to decide which key is to be kept in the cookies.
//cookie m user-id ko store krwate the manual authentication wahi ho rha h, orr encrypted bhi hai.
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done){
    const user = await User.find
})