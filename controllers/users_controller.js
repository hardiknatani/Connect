const User = require('../models/user');
const Post = require('../models/post');


module.exports.profile = function(req, res){
    User.findById(req.params.id,(err,user)=>{
        return res.render('profile', {
            title: 'User Profile',
            profile_user:user
        })
    })
   
}

module.exports.update = (req,res)=>{
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect('back')
        })
    }else{
        res.status(401).send('Unauthorized');
    }
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
        res.redirect('/users/profile');
        console.log(res.locals.user)
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
    req.flash('success',"Logged in Successfully")
return res.redirect('/')}


module.exports.destroySession=(req,res)=>{
    req.logout()
    req.flash('success',"Logged out Successfully")
    
    return res.redirect('/')
}


