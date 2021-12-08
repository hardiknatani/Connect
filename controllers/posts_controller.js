const Post = require('../models/post');
const Comment = require('../models/comment')
// const User = require('../models/user');


module.exports.createPost =async (req,res)=>{
try{
    await Post.create({
        content:req.body.content,
        user:res.locals.user.id
    })
    req.flash('success','Post Published')
            return res.redirect('/')
}catch(err){
    req.flash('error',err)
    return res.redirect('back')
}
    
}


module.exports.destroy =async (req,res)=>{
  try{
    let post = await Post.findById(req.params.id);

    if(post.user==req.user.id){
     post.remove();
     await Comment.deleteMany({post:req.params.id});
     req.flash('success','Post Deleted Successfully')

     return res.redirect('back')
     }else{
    req.flash('error','You cannot delete this post')
     return res.redirect('back')
 }
  }catch(err){
    req.flash('error',err)

    console.log('Error: ',err)
   
  }
}