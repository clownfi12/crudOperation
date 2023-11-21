
const Post = require("../models/Post");

const path = require('path');
const fs = require('fs');

module.exports.addPostData = async (req,res) =>{
    console.log(req.file);
    console.log(req.body);
    var imgPath = ''
    if(req.file){
        imgPath = Post.imagePath+"/"+req.file.filename;
    }

    req.body.postImage = imgPath;
    await Post.create(req.body);
    return res.redirect('back');
}


module.exports.viewPostDetails = async (req,res) =>{
    let postData = await Post.find({});

    return res.render("view_post",{
        allPost : postData
    })
}

module.exports.deletePost= async (req,res)=>{
    // console.log(req.params.postId);
    try{    
        let oldPostData = await Post.findById(req.params.postId);
        if(oldPostData){
            var oldImage = oldPostData.postImage;
            if(oldImage){
                let fullPath = path.join(__dirname,'..',oldImage);
                let dImage = await fs.unlinkSync(fullPath);

                let deleteRecord = await Post.findByIdAndDelete(req.params.postId);
                if(deleteRecord){
                    console.log("record & Image deleted successfully");
                    return res.redirect('back');
                }
                else{
                    console.log("record  deleted successfully");
                    return res.redirect('back');
                }
            }
            else{
                let deleteRecord = await Post.findByIdAndDelete(req.params.postId);
                if(deleteRecord){
                    console.log("record  deleted successfully");
                    return res.redirect('back');
                }
                else{
                    console.log("record  deleted successfully");
                    return res.redirect('back');
                }
            }
        }
        else{
            console.log("record not found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.updatePost = async (req,res) =>{
    try{
        let oldData = await Post.findById(req.params.postId);
        if(oldData){
            return res.render('update_post',{
                singlePost : oldData
            })
        }
        else{
            console.log("record not found");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');

    }
}

module.exports.EditPostData = async (req,res) =>{
    try{
       if(req.file){
            let oldData = await Post.findById(req.body.EditPostId);
            if(oldData){
                 if(oldData.postImage)
                 {  
                    let fullPath = path.join(__dirname,'..',oldData.postImage);
                    await fs.unlinkSync(fullPath);
                 }
                 else{

                 }
                
                 var imgPath = Post.imagePath+"/"+req.file.filename;
                 req.body.postImage = imgPath;

                 let dd  = await Post.findByIdAndUpdate(req.body.EditPostId,req.body);
                 
                 if(dd){
                    console.log("record and image updated successfully");
                    return res.redirect('/post/viewPostDetails');
                 }
                 else{
                    console.log("record not updated");
                    return res.redirect('/post/viewPostDetails');
                }

            }
            else{
                console.log("record not found");
                return res.redirect('/post/viewPostDetails');
            }
       }
       else{
        let oldData = await Post.findById(req.body.EditPostId);
        if(oldData){
            req.body.postImage = oldData.postImage;
            let dd  = await Post.findByIdAndUpdate(req.body.EditPostId,req.body);
            if(dd){
                console.log("record and image updated successfully");
                return res.redirect('/post/viewPostDetails');
            }
            else{
                console.log("record not updated");
                return res.redirect('/post/viewPostDetails');
            }
        }
        else{
            console.log("record not found");
            return res.redirect('/post/viewPostDetails');
        }

       }
    }
    catch(err){
        console.log(err);
        return res.redirect('/post/viewPostDetails');
    }
}