const User = require('../models/user');


module.exports.profile = function(req, res){
    return res.render('profile', {
        title: 'User Profile',
        user : req.user
    })

   
}


// render the sign up page
module.exports.signup = function(req, res){

    if (req.isAuthenticated()){
        res.redirect('/users/profile')
    }else{
    return res.render('signup', {
        title: "Connect | Sign Up"
    })}
}


// render the sign in page
module.exports.signin = function(req, res){
    if (req.isAuthenticated()){
        res.redirect('/users/profile')
    }else {
    return res.render('signin', {
        title: "Connect | Sign In"
    })}
}

// get the sign up data
module.exports.createUser = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up:', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log(err); return}

                else{console.log(user);
                    return res.redirect('/users/signin');
                }
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
return res.redirect('/users/profile')}


module.exports.destroySession=(req,res)=>{
    req.logout()
    
    return res.redirect('/')
}