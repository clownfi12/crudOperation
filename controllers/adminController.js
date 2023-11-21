const St = require("../models/Student");

const path = require('path');

const fs = require('fs');


module.exports.addDetails = async (req,res) =>{
    return res.render('add_details');
}

module.exports.addStudentDetails = async (req,res) =>{
    var imagePath = '';
    if(req.file){
        imagePath = St.imageModelPath+"/"+req.file.filename
    }

    req.body.adminImage = imagePath;
    await St.create(req.body);
    return res.redirect('back');
}


module.exports.view_details = async (req,res)=>{
    let data = await St.find({});
    return res.render('view_details',{
        StData : data
    })
}

module.exports.deleteStudent = async (req,res) =>{
    
    let OldData = await St.findById(req.params.id);
    if(OldData.adminImage){
        let fullPath = path.join(__dirname,"..",OldData.adminImage);
        await fs.unlinkSync(fullPath);
    }

    await St.findByIdAndDelete(req.params.id);
    return res.redirect('back');
}


module.exports.updateStudent = async (req,res) =>{
    let record =  await St.findById(req.params.id);
    // console.log(record);
    return res.render('update_details',{
        oldSt : record
    })
}


module.exports.EditStudentDetails = async (req,res) =>{
    let oldData = await St.findById(req.body.EditId);
    if(req.file){
       
        let fullPath = path.join(__dirname,"..",oldData.adminImage);
        await fs.unlinkSync(fullPath);
        
        req.body.adminImage = St.imageModelPath+"/"+req.file.filename;
    }
    else{
        req.body.adminImage = oldData.adminImage;
    }

    await St.findByIdAndUpdate(req.body.EditId, req.body);
    return res.redirect('/view_details');
    
}