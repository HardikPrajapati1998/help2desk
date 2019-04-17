var express = require('express');
var router = express.Router();
var Questionmodel = require('../schema/Question_table');
var Materialmodel = require('../schema/Material_table');
var UsersModel = require('../schema/User_table');
/* GET home page. */

router.get('/', function(req, res, next) {
  var mysession = req.session.email;
  if(!mysession){
    res.redirect('/login');
  } 
  UsersModel.findById(req.session.userid,function(err,db_user_array){
  UsersModel.find(function(err,data){
        Questionmodel.find(function(err,question){
            if(err)
            res.json({message: 'There are no posts here.'});
            console.log(question);
            Questionmodel.find({})
            .populate('user_id')
            .exec(function(err, question) {
            console.log("full question deatils --------------------",question);
            Materialmodel.find(function(err,material){
              if(err){
                console.log("Error In  Fetch Data " + err)
              }
              else{
                console.log("....................................."+data);
                
                res.render('index',{ user_array: db_user_array, user_array1 : data,question_array:question,material_array:material});
                
              }
            });
            });  
          });
        });
      });
});

  

router.get('/blog', function(req, res, next) {
  var mysession = req.session.email;
  if(!mysession){
    res.redirect('/login');
  }

  UsersModel.findById(req.session.userid,function(err,db_user_array){

    console.log(req.session.userid);
    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_user_array);
      res.render('blog',{user_array: db_user_array});
    }
  
  });
});
router.get('/contact', function(req, res, next) {
  
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/login');
}
UsersModel.findById(req.session.userid,function(err,db_user_array){

  console.log(req.session.userid);
  if(err){
    console.log("Error is Single Recode Fetch "+err);
  }
  else{
    console.log(db_user_array);
    res.render('contact',{user_array: db_user_array});
  }

});
  
});
router.get('/login', function(req, res, next) {
  
  res.render('login', { title: 'Express' });
});
router.get('/how-work', function(req, res, next) {
  
      res.render('how-work');
   
  
});
router.get('/listing', function(req, res, next) {
  var mysession = req.session.email;
  if(!mysession){
    res.redirect('/login');
  }

  UsersModel.findById(req.session.userid,function(err,db_user_array){
   Questionmodel.find(function(err,data){
    if(err)
    res.json({message: 'There are no posts here.'});
    console.log(data);
    Questionmodel.find({})
    .populate('user_id')
    .exec(function(err, data) {
    console.log("full question deatils --------------------",data);
     if(err){
     console.log("Error In  Fetch Data " + err)
   }
   else{
       console.log(data);
       res.render('listing',{  Question_array : data,user_array: db_user_array});
     }
    });
 });
  });
});
router.get('/post-question', function(req, res, next) {
  
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/login');
}
UsersModel.findById(req.session.userid,function(err,db_user_array){
  
  console.log(req.session.userid);
  if(err){
    console.log("Error is Single Recode Fetch "+err);
  }
  else{
    console.log(db_user_array);
    res.render('post-question',{user_array: db_user_array});
  }

});

 
});
router.get('/profile-setting', function(req, res, next) {
  
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/login');
}
UsersModel.findById(req.session.userid,function(err,db_user_array){

  console.log(req.session.userid);
  if(err){
    console.log("Error is Single Recode Fetch "+err);
  }
  else{
    console.log(db_user_array);
    res.render('profile-setting',{user_array: db_user_array});
  }

});

 
});
router.get('/dashboard', function(req, res, next) {
  var mysession = req.session.email;
  if(!mysession){
  res.redirect('/login');
  }
  Questionmodel.findById(req.session.userid,function(err,question){
  UsersModel.findById(req.session.userid,function(err,db_user_array){

    console.log(req.session.userid);
    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_user_array);
      res.render('profile',{user_array: db_user_array,question_array:question});
    }

  });
});
});
router.get('/question-detial', function(req, res, next) {
  
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/login');
}
UsersModel.findById(req.session.userid,function(err,db_user_array){

    Questionmodel.find(function(err,data){
     if(err){
     console.log("Error In  Fetch Data " + err)
   }
   else{
       console.log(data);
       res.render('question-detial',{  Question_array : data,user_array: db_user_array});
     }
    });
 });
  });
  

router.get('/question-list', function(req, res, next) {
 
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/login');
}
UsersModel.findById(req.session.userid,function(err,db_user_array){

  console.log(req.session.userid);
  if(err){
    console.log("Error is Single Recode Fetch "+err);
  }
  else{
    console.log(db_user_array);
    res.render('question-list',{user_array: db_user_array});
  }

});
  
});
router.get('/register', function(req, res, next) {

  res.render('register', { title: 'Express' });
});

router.get('/post-material', function(req, res, next) {
  var mysession = req.session.email;
  if(!mysession){
    res.redirect('/login');
  }

  UsersModel.findById(req.session.userid,function(err,db_user_array){

    console.log(req.session.userid);
    if(err){
      console.log("Error is Single Recode Fetch "+err);
    }
    else{
      console.log(db_user_array);
      res.render('post-material',{user_array: db_user_array});
    }
  
  });

 
});
router.get('/listing-material', function(req, res, next) {
  var mysession = req.session.email;
  if(!mysession){
    res.redirect('/login');
  }

  UsersModel.findById(req.session.userid,function(err,db_user_array){
    
  Materialmodel.find(function(err,data){
    if(err)
    res.json({message: 'There are no posts here.'});
    console.log(data);
    Materialmodel.find({})
    .populate('user_id')
    .exec(function(err, data) {
    console.log("full question deatils --------------------",data);
    if(err){
    console.log("Error In  Fetch Data " + err)
  }
  else{
      console.log(data);
      res.render('listing-material',{  Material_array : data,user_array: db_user_array});
    }
  });
});
  });
});
/////////////////////////////////////////////////// Login Page//////////////////////////////////////////////////////////////////////



/* GET home page. */


router.post('/signup', function (req, res, next) {
  console.log("hardik");
  console.log(req.body);
  var email = req.body.User_email; 

  console.log(req.body);
  UsersModel.findOne({ "User_email": email }, function (err, db_Users_array) {

    console.log("Find One " + db_Users_array);
    if (db_Users_array) {
  
      res.send("email already exists");
    }
    else{
      const mybodydata = {
        User_fname: req.body.User_fname,
        User_email: req.body.User_email,
        User_password: req.body.User_password,
        
    
      }
      var data = UsersModel(mybodydata);
    
      data.save(function (err) {
        if (err) {
          console.log("Error in Insert Record" + err);
        } else {
          res.redirect('/login');
        }
      })
    
    }
  });
  //Create an Array 
  
});
router.get('/forgot_password', function(req, res, next) {
  res.render('forgot_password', { title: 'Express' });
});
 
router.post('/forgot_password', function(req, res, next) {
  var email = req.body.User_email; 

  console.log(req.body);
  UsersModel.findOne({ "User_email": email }, function (err, db_Users_array) {

    console.log("Find One " + db_Users_array);

    if (db_Users_array) {
      var db_email = db_Users_array.User_email;
      var db_password = db_Users_array.User_password;

    }

    console.log("db_Users_array.User_email " + db_email);
    console.log("db_Users_array.User_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.render('Admin/error');
    }
    else if (db_email == email) {
     
      
      

      "use strict";
      // setup email data with unicode symbols
  


  const nodemailer = require('nodemailer');
    
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "crazy2engineers@gmail.com", // generated ethereal user
            pass: "Crazy2@engineers" // generated ethereal password
        }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Help Desk" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: "Forgot Password", // Subject line
      text: "Hello your password is "  + db_password, // plain text body
      html: "Hello your password is "  + db_password // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  res.redirect('/login');
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
  
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});

router.get('/forms',function(req,res,next)
{
res.render('forms');
});




router.get('/login',function(req,res,next)
{
res.render('login');
});

router.post('/loginprosee', function(req, res, next) {
  
  var var1 = req.body.User_email;
  var var2 =req.body.User_password;
  console.log("I am Variable "+ var1);
  req.session.mysession = var1;
  res.cookie("Email" , var2 , {maxAge : 600000});
  
  console.log("I am Session " + req.session.mysession);
 
  
  var email = req.body.User_email;
  var password = req.body.User_password;

  console.log(req.body);
  UsersModel.findOne({ "User_email": email }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.User_email;
      var db_password = db_users_array.User_password;

    }

    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.render("admin");
    }
    else if (db_email == email && db_password == password) {
      req.session.userid=db_users_array._id;
      req.session.email = db_email;
      console.log("hardik"+req.session.userid);
      res.redirect('/');
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

 
  });
});

router.get('/logout',function(req,res,next)
{
  req.session.destroy();
res.redirect('/');
});


// API CODE
router.post('/admin-signup-api', function (req, res, next) {
  console.log(req.body);

  //Create an Array 
  const mybodydata = {
    Admin_name: req.body.Admin_name,
    User_email: req.body.User_email,
    User_password: req.body.User_password,
    

  }
  var data = UsersModel(mybodydata);

  data.save(function (err) {
    if (err) {
      console.log("Error in Insert Record" + err);
      return res.send({ "flag": "0", "message": "Error in Record Insert" });
    } else {
      return res.send({ "flag": "1", "message": "Record Added" });
    }
  })

});


router.post('/admin-loginprosee-api', function(req, res, next) {
  
 
  
  var email = req.body.User_email;
  var password = req.body.User_password;

  console.log(req.body);
  UsersModel.findOne({ "User_email": email }, function (err, db_users_array) {

    console.log("Find One " + db_users_array);

    if (db_users_array) {
      var db_email = db_users_array.User_email;
      var db_password = db_users_array.User_password;

    }

    console.log("db_users_array.user_email " + db_email);
    console.log("db_users_array.user_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.render("admin");
    }
    else if (db_email == email && db_password == password) {
     
      console.log("hardik");
      return res.send(JSON.stringify({db_users_array, "flag": "1"}));
      
    }
    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
      return res.send({ "flag": "0", "message": "Error in Record Insert" });
    }

 
  });
});

router.get('/admin-delete/:id', function(req, res, next) {
  
  console.log(req.params.id);
  UsersModel.findByIdAndDelete(req.params.id,function(err,db_Category_array){

    if(err){
      console.log("Error is Single Recode Fetch "+err);
      return res.send({ "flag": "0", "message": "No Records Found" });
    }
    else{
      console.log("Recode Delet");
      var message =" Records Delete";
            return res.end(JSON.stringify({ "flag": "1", "message": message}));
    }

  });
});


router.post('/profile_edit', function(req,res) {

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
     
        updated_date: Date(),
        User_profile:myfilename
      
      }
      
      UsersModel.findByIdAndUpdate(req.session.userid,mybodydata,function(err){
        if(err){
          console.log("Error in Recode Upadet");
          res.redirect('/form');
    
        }else{
          res.redirect('/profile-setting');
        }
      });
});


router.post('/profile-setting', function(req,res) {

  
  const mybodydata = {
    User_fname: req.body.User_fname,
    User_email: req.body.User_email,
    User_password: req.body.User_password,
    

  }
    
    UsersModel.findByIdAndUpdate(req.session.userid,mybodydata,function(err){
      if(err){
        console.log("Error in Recode Upadet");
        res.redirect('/form');
  
      }else{
        res.redirect('/profile-setting');
      }
    });
});



router.get('/logout',function(req,res,next)
{
  req.session.destroy();
res.redirect('/');
});

module.exports = router;
