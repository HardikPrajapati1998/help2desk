var express = require('express');
var router = express.Router();
var Materialmodel = require('../schema/Material_table');
var UsersModel = require('../schema/User_table');
/* GET Materials listing. */
router.get('/', function(req, res, next) {
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/');
}
  Materialmodel.find(function(err,data){
  
    if(err){
      console.log("Error In  Fetch Data " + err)
    }
    else{
      console.log(data);
      res.render('Material_add',{  Material_array : data});
    }

  });
     
    
});

router.get('/Material_display', function(req, res, next) {
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/');
}
  Materialmodel.find(function(err,data){
  
    if(err){
      console.log("Error In  Fetch Data " + err)
    }
    else{
      console.log(data);
      res.render('Material_display',{  Material_array : data});
    }

  });
});




router.post('/Material-proess',function(req,res,next)
{

  console.log(req.body);
  console.log(req.files.Material_upload);
  var myfile = req.files.Material_upload;
  
  var myfilename = myfile.name;
  console.log("file name"+myfilename);
  console.log("file:"+myfile+"File Name: "+myfilename);
  
  myfile.mv("public/material/"+myfilename, function(err){
  
    if(err){
      return res.status(500).send(err);
    }
  });
  const mybodydata = {
   
    Material_title:req.body.Material_title,  
    Material_detail:req.body.Material_detail,
    Material_upload:myfilename,
    user_id:  req.session.userid
    
  }
  console.log(mybodydata);
    var  data =  Materialmodel(mybodydata);
  
    data.save(function(err){
  
    if (err) {
      console.log("Error In Insert Record");
    }else{
    res.redirect('/');
    }
  })



});



router.get('/edit/:id', function(req, res, next) {
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/');
}
  console.log(req.params.id);

  Materialmodel.findById(req.params.id,function(err,db_Material_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_Material_array);
      res.render('Material_edite',{Material_array: db_Material_array});
    }

  });
});


router.post('/edit/:id', function(req, res, next) {

console.log(req.files.Material_upload);
var myfile = req.files.Material_upload;

var myfilename = myfile.name;
console.log("file name"+myfilename);
console.log("file:"+myfile+"File Name: "+myfilename);

myfile.mv("public/material/"+myfilename, function(err){

  if(err){
    return res.status(500).send(err);
}
});
  const mybodydata = {
    Material_title:req.body.Material_title,  
    Material_detail:req.body.Material_detail,
    updated_date: Date(),
   
    
    Material_upload:myfilename
  
  }
  
  Materialmodel.findByIdAndUpdate(req.params.id,mybodydata,function(err){
    if(err){
      console.log("Error in Recode Upadet");
      res.redirect('/form');

    }else{
      res.redirect('/Material/Material_display');
    }
  });
  });




router.get('/show/:id', function(req, res, next) {
  console.log("hardik")
  var mysession = req.session.email;
  if(!mysession){
    res.redirect('/');
  }
  console.log(req.params.id);
  UsersModel.findById(req.session.userid,function(err,db_user_array){
  Materialmodel.findById(req.params.id,function(err,db_Material_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_Material_array);
      res.render('material-detial',{user_array: db_user_array,Material_array: db_Material_array});
    }

  });
});
});
router.get('/delete/:id', function(req, res, next) {
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/');
}
  console.log(req.params.id);
  Materialmodel.findByIdAndDelete(req.params.id,function(err,db_Material_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
      res.redirect('/Materials/Material_display');
    }
    else{
      console.log("Recode Delet");
      res.redirect('/Material/Material_display');
    }

  });
});



// API CODE


router.post('/material-add-api', function (req, res, next) {
  console.log(req.body);

  if (!req.body.Material_title) {
    return res.send({ "flag": "0", "message": "missing a parameter" });
  } else {

    const mybodydata = {
      Material_title:req.body.Material_title,  
      Material_detail:req.body.Material_detail,
    }
    var data = Materialmodel(mybodydata);
  

    data.save(function (err) {
      if (err) {
        return res.send({ "flag": "0", "message": "Error in Record Insert" });
      } else {
        return res.send({ "flag": "1", "message": "Record Added" });
      }
    })
    
  }

});

router.get('/material-view-api', function (req, res, next) {

  Materialmodel.find(function (err, db_material_array) {
    if (err) {
      res.send({ 'error': 'An error has occurred' });
    } else {
   
      if(db_material_array.length > 0)
      {
        console.log(db_material_array);
        var count = db_material_array.length;
        var message = count + " Records Found";

        return res.end(JSON.stringify({db_material_array, "flag": "1", "message": message}));
     

      }else{
        return res.send({ "flag": "0", "message": "No Records Found" });
      }
    

    }
  });

});




//Get Single User By ID
router.get('/material-view-details-api/:id', function (req, res) {
  console.log(req.params.id);
  Materialmodel.findById(req.params.id, function (err, db_material_array) {
    if (err) {
      res.send({ 'error': 'An error has occurred' });
    } else {
   
      if(db_material_array)
      {
        console.log(db_material_array);
     
        var message = " Records Found";

        return res.end(JSON.stringify({db_material_array, "flag": "1", "message": message}));
   

      }else{
        return res.send({ "flag": "0", "message": "No Records Found" });
      }
    

    }
  });
});


router.get('/material-delete/:id', function(req, res, next) {
 
  console.log(req.params.id);
  Materialmodel.findByIdAndDelete(req.params.id,function(err,db_Material_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
      return res.send({ "flag": "0", "message": "No Records Found" });
    }
    else{
      console.log("Recode Delet");
      var message =  " Records Delete";

      return res.end(JSON.stringify({ "flag": "1", "message": message}));
    }

  });
});



module.exports = router;