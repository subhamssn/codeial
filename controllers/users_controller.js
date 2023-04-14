const User = require('../models/user');


module.exports.profile = async function(req, res){
  if(req.cookies.user_id){
     const user = await User.findById(req.cookies.user_id).exec();
     if(user){
       return res.render('user_profile', {
        title: "Profile Page",
        user: user
       })
     }
     return res.redirect('users/sign-in')
  } else{
    return res.redirect('users/sign-in');
  }


}


module.exports.sign_in = function(req, res){
        return res.render('user_sign_in', {
            title: "Codeial | Sign In"
        })
}

module.exports.sign_up = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


module.exports.create = async function(req, res) {
    try {
      if (
        req.body.password != req.body.confirm_password
      ) {
        return res.redirect('back');
      }
  
      const user = await User.findOne({ email: req.body.email }).exec();
  
      if (!user) {
        const newUser = await User.create(req.body);
        return res.redirect('/users/sign-in');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.log('error in creating user while signing up', err);
      return res.redirect('back');
    }
  };



  // sign in and create a session for the user

module.exports.createSession = async function(req, res){
     
     //steps to authenticate
     //find the user

     const user = await User.findOne({email: req.body.email}).exec();

     //handle user found
     if(user){
      
      // handle password which doesn't match
        if(user.password != req.body.password){
          return res.redirect('back');
        }

      // handle session creation
      res.cookie('user_id', user.id);
      return res.redirect('/users/profile');
      
     }

     else{
      //handle user not found
      return res.redirect('back');
     }
}

