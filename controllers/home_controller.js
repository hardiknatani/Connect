const Post = require('../models/post');
const User = require('../models/user')





try{
    
    module.exports.home = async (req,res) =>{
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });
        let users = await  User.find({})
        return res.render('home',{
            posts:posts,
            title:'Connect Home',
            all_users:users
            
        });
        
        
        }
}catch(err){
console.log('Error:',err )
}


// .exec(function(err,posts){
//    ,(err,users)=>{
//         if (err){console.log(err);return;}
       
//     });
      
//     })