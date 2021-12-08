const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

 passport.use(new LocalStrategy({
     usernameField:'email',
    passReqToCallback:true}
     ,function (req,email, password, done) {
         User.findOne({ email: email }, (err, user) => {
             if (err) {
                 req.flash('error',err)
                 return done(err);
             }

             if (!user) {
                req.flash('error','Invalid Username/Password')
 
                 console.log('user not found');
                 return done(null, false);
             }

             if (user.password != password) {
                req.flash('error','Invalid Username/Password')
                 return done(null, false);
             }

             return done(null, user);
         });
     }
 ))


 //serealized user function -- to decide which key to put in cookie
passport.serializeUser((user,done)=>{
    done(null,user.id)
})




 //deserealize user function

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){
            console.log('Error in finding user--->Passport')
            return done(err)}
        return done(null,user)
        
    })
})


//setting up authentication middleware
passport.checkAuthentication = (req,res,next)=>{
    if (req.isAuthenticated()){
        return next();
    }



//if user not signed in
    return res.redirect('/users/signin')
}



passport.setAuthenticatedUser = (req,res,next)=>{
    if (req.isAuthenticated()){
        
        res.locals.user = req.user
        // console.log(res.locals)
    }

    next()
}

module.exports = passport;