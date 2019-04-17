var express = require('express');
var router = express.Router();
var Categorymodel = require('../schema/category_table');
/* GET Categorys listing. */
router.get('/', function(req, res, next) {
var mysession = req.session.email;
if(!mysession){
  res.redirect('/');
}
  Categorymodel.find(function(err,data){
  
    if(err){
      console.log("Error In  Fetch Data " + err)
    }
    else{
      console.log(data);
      res.render('Category_add',{  Category_array : data});
    }

  });
     
    
});

router.get('/Category_display', function(req, res, next) {
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/');
}
  Categorymodel.find(function(err,data){
  
    if(err){
      console.log("Error In  Fetch Data " + err)
    }
    else{
      console.log(data);
      res.render('Category_display',{  Category_array : data});
    }

  });
});




router.post('/Category-proess',function(req,res,next)
{
  var mysession = req.session.email;
  if(!mysession){
    res.redirect('/');
  }
  // var1=req.body.Category_cpassword;
  // req.session.Category_cpassword=var1;
  // console.log(req.session.cname);

    
 // res.send("First Name:"+req.body.fname+"<br/>"+"Last Name:"+req.body.lname+"<br/>"+"Email Id:"+req.body.ename+"<br/>"+"Mobile No:"+ req.body.mname);
 
 
 console.log(req.body);

  if (!req.body.Category_name) {
    return res.send({ "flag": "0", "message": "missing a parameter" });
  } else {

    const mybodydata = {
      category_name: req.body.Category_name
    }
    var data = Categorymodel(mybodydata);
  

    data.save(function (err) {
      if (err) {
        return res.send({ "flag": "0", "message": "Error in Record Insert" });
      } else {
        return res.send({ "flag": "1", "message": "Record Added" });
      }
    })
    
  }

});



router.get('/edit/:id', function(req, res, next) {
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/');
}
  console.log(req.params.id);

  Categorymodel.findById(req.params.id,function(err,db_Category_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_Category_array);
      res.render('Category_edite',{Category_array: db_Category_array});
    }

  });
});


router.post('/edit/:id', function(req, res, next) {


  const mybodydata = {
    Category_name:req.body.Category_name,  
    updated_date: Date()
    
   
  }
  
  Categorymodel.findByIdAndUpdate(req.params.id,mybodydata,function(err){
    if(err){
      console.log("Error in Recode Upadet");
      res.redirect('/form');

    }else{
      res.redirect('/Category/Category_display');
    }
  });
  });




router.get('/show/:id', function(req, res, next) {
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/');
}
 
  console.log(req.params.id);
  Categorymodel.findById(req.params.id,function(err,db_Category_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_Category_array);
      res.render('Category_show',{Category_array: db_Category_array});
    }

  });
});

router.get('/delete/:id', function(req, res, next) {
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/');
}
  console.log(req.params.id);
  Categorymodel.findByIdAndDelete(req.params.id,function(err,db_Category_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
      res.redirect('/Categorys/Category_display');
    }
    else{
      console.log("Recode Delet");
      res.redirect('/Category/Category_display');
    }

  });
});


// API CODE



router.post('/category-add-api', function (req, res, next) {
  console.log(req.body);

  if (!req.body.category_name) {
    return res.send({ "flag": "0", "message": "missing a parameter" });
  } else {

    const mybodydata = {
      category_name: req.body.category_name
    }
    var data = Categorymodel(mybodydata);
  

    data.save(function (err) {
      if (err) {
        return res.send({ "flag": "0", "message": "Error in Record Insert" });
      } else {
        return res.send({ "flag": "1", "message": "Record Added" });
      }
    })
    
  }

});




router.get('/category-view-api', function (req, res, next) {

  Categorymodel.find(function (err, db_category_array) {
    if (err) {
      res.send({ 'error': 'An error has occurred' });
    } else {
   
      if(db_category_array.length > 0)
      {
        console.log(db_category_array);
        var count = db_category_array.length;
        var message = count + " Records Found";

        return res.end(JSON.stringify({db_category_array, "flag": "1", "message": message}));
       //return res.json(db_category_array);
       //return res.end(JSON.stringify({ a: 1 }));
       //return res.send({ 'error': 'An error has occurred' });
       //return res.json({        errors: ['Failed to create photo']      });

      }else{
        return res.send({ "flag": "0", "message": "No Records Found" });
      }
    

    }
  });

});




//Get Single User By ID
router.get('/category-view-details-api/:id', function (req, res) {
  console.log(req.params.id);
  Categorymodel.findById(req.params.id, function (err, db_categor_array) {
    if (err) {
      res.send({ 'error': 'An error has occurred' });
    } else {
   
      if(db_categor_array)
      {
        console.log(db_categor_array);
       
        var message =  " Records Found";

        return res.end(JSON.stringify({db_categor_array, "flag": "1", "message": message}));
   

      }else{
        return res.send({ "flag": "0", "message": "No Records Found" });
      }
    

    }
  });
});

router.get('/category-delete/:id', function(req, res, next) {
  
  console.log(req.params.id);
  Categorymodel.findByIdAndDelete(req.params.id,function(err,db_Category_array){

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