var express = require('express');
var router = express.Router();
var Usermodel = require('../schema/User_table');
/* GET users listing. */
router.get('/', function(req, res, next) {
  Usermodel.find(function(err,data){
  
    if(err){
      console.log("Error In  Fetch Data " + err)
    }
    else{
      console.log(data);
      res.render('User_add1',{  user_array : data});
    }

  });
     
    
});

router.get('/User_display', function(req, res, next) {
  Usermodel.find(function(err,data){
  
    if(err){
      console.log("Error In  Fetch Data " + err)
    }
    else{
      console.log(data);
      res.render('User_display',{  user_array : data});
    }

  });
});




router.post('/user-proess',function(req,res,next)
{

  // var1=req.body.User_cpassword;
  // req.session.User_cpassword=var1;
  // console.log(req.session.cname);

    var gname=req.body.User_gender;
  console.log(gname);
 // res.send("First Name:"+req.body.fname+"<br/>"+"Last Name:"+req.body.lname+"<br/>"+"Email Id:"+req.body.ename+"<br/>"+"Mobile No:"+ req.body.mname);
  var pname= req.body.User_password;
  
  
  console.log(req.body);
  console.log(req.files.User_profile);
  var myfile = req.files.User_profile;
  
  var myfilename = myfile.name;
  console.log("file name"+myfilename);
  console.log("file:"+myfile+"File Name: "+myfilename);
  
  myfile.mv("public/profile/"+myfilename, function(err){
  
    if(err){
      return res.status(500).send(err);
    }
  });
  const mybodydata = {
   
    User_fname:req.body.User_fname,  
    User_lname:req.body.User_lname,
    User_email:req.body.User_email,
    User_gender:req.body.User_gender,
    User_address:req.body.User_address,
    User_profile:myfilename,
    User_password:req.body.User_password
  }
  console.log(mybodydata);
    var  data =  Usermodel(mybodydata);
  
    data.save(function(err){
  
    if (err) {
      console.log("Error In Insert Record");
    }else{
    res.redirect('/users/User_display');
    }
  })



});



router.get('/edit/:id', function(req, res, next) {
  
  console.log(req.params.id);

  Usermodel.findById(req.params.id,function(err,db_user_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_user_array);
      res.render('User_edite',{user_array: db_user_array});
    }

  });
});


router.post('/edit/:id', function(req, res, next) {

console.log(req.files.User_profile);
var myfile = req.files.User_profile;

var myfilename = myfile.name;
console.log("file name"+myfilename);
console.log("file:"+myfile+"File Name: "+myfilename);

myfile.mv("public/"+myfilename, function(err){

  if(err){
    return res.status(500).send(err);
}
});
  const mybodydata = {
    User_fname:req.body.User_fname,  
    User_lname:req.body.User_lname,
    User_email:req.body.User_email,
    User_gender:req.body.User_gender,
    User_address:req.body.User_address,
    User_password:req.body.User_password,
    
    User_profile:myfilename
  
  }
  
  Usermodel.findByIdAndUpdate(req.params.id,mybodydata,function(err){
    if(err){
      console.log("Error in Recode Upadet");
      res.redirect('/form');

    }else{
      res.redirect('/users/User_display');
    }
  });
  });




router.get('/show/:id', function(req, res, next) {
  
 
  console.log(req.params.id);
  Usermodel.findById(req.params.id,function(err,db_user_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_user_array);
      res.render('User_show',{user_array: db_user_array});
    }

  });
});

router.get('/delet/:id', function(req, res, next) {
  
  console.log(req.params.id);
  Usermodel.findByIdAndDelete(req.params.id,function(err,db_user_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
      res.redirect('/users/User_display');
    }
    else{
      console.log("Recode Delet");
      res.redirect('/users/User_display');
    }

  });
});


module.exports = router;