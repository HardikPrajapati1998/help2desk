var express = require('express');
var router = express.Router();
var Contactmodel = require('../schema/Contact_table');
/* GET users listing. */
router.get('/', function(req, res, next) {
  var mysession = req.session.email;
  if(!mysession){
    res.redirect('/');
  }
          res.render('Contact_add');
       
     
    
});

router.post('/answer/:id',function(req,res,next)
{

    const mybodydata = {
   
        Contact_answer: req.body.aname
      }
    
      Contactmodel.findByIdAndUpdate(req.params.id,mybodydata,function(err){
      if(err){
        console.log("Error in Recode Upadet");
        res.redirect('/form');
  
      }else{
        res.redirect('/Contact/Contact_display');
      }
    });
});


router.get('/Contact_display', function(req, res, next) {
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/');
}
    Contactmodel.find(function(err,data){
  
        if(err){
          console.log("Error In  Fetch Data " + err)
        }
        else{
          console.log(data);
          res.render('Contact/Contact_display',{  Contact_array : data});
        }
    
      });
     
    
});


router.post('/Contact-proess',function(req,res,next)
{

 var Contact_name = req.body.Contact_name;
 var Contact_email= req.body.Contact_emai;
 var Contact_message = req.body.Contact_message;
var   Contact_subject = req.body.Contact_subject;
  const mybodydata = {
    Contact_name :req.body.Contact_name,
    Contact_email:req.body.Contact_email,
    Contact_message: req.body.Contact_message,
    Contact_subject:req.body.Contact_subject
    
  }

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
      to: "hrp1501998@gmail.com", // list of receivers
      subject: Contact_subject , // Subject line
      text: "User Name: "  + Contact_name, // plain text body
      html: "User Name: "  + Contact_name+"<br/>"+"Message :"  + Contact_message // html body
    };
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        console.log(mybodydata);
        var  data =  Contactmodel(mybodydata);
      
        data.save(function(err){
      
        if (err) {
          console.log("Error In Insert Record");
        }else{
        res.redirect('/Contact');
        }
      })
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  });
  
  
});

router.get('/edit/:id', function(req, res, next) {
  var mysession = req.session.email;
if(!mysession){
  res.redirect('/');
}
    console.log(req.params.id);
  
    Contactmodel.findById(req.params.id,function(err,db_Contact_array){
  
      if(err){
        console.log("Error is Single Recode Fetch "+err);
      }
      else{
        console.log(db_Contact_array);
        res.render('Contact/Contact_edite',{Contact_array: db_Contact_array});
      }
  
    });
  });
  
  
  router.post('/edit/:id', function(req, res, next) {
  
  
    const mybodydata = {
   
        Contact_detail: req.body.Contact_detail,
        Contact_title :req.body.Contact_title,
        updated_date: Date()
      }
    
      Contactmodel.findByIdAndUpdate(req.params.id,mybodydata,function(err){
      if(err){
        console.log("Error in Recode Upadet");
        res.redirect('/form');
  
      }else{
        res.redirect('/Contact/Contact_display');
      }
    });
    });
  

    router.get('/delet/:id', function(req, res, next) {
      var mysession = req.session.email;
      if(!mysession){
        res.redirect('/');
      }
        console.log(req.params.id);
        Contactmodel.findByIdAndDelete(req.params.id,function(err,db_Contact_array){
      
          if(err){
            console.log("Error is Single Recode Fetch "+err);
            res.redirect('Contact/Contact_display');
          }
          else{
            console.log("Recode Delet");
            res.redirect('/Contact/Contact_display');
          }
      
        });
      });

      // API CODE 


      router.post('/Contact-add-api', function (req, res, next) {
        console.log(req.body);
      
        if (!req.body.Contact_name) {
          return res.send({ "flag": "0", "message": "missing a parameter" });
        } else {
      
          const mybodydata = {
            Contact_name :req.body.Contact_name,
            Contact_email: req.body.Contact_email,
            Contact_subject:req.body.Contact_subject,
            Contact_message:req.body.Contact_message
          }
          var data = Contactmodel(mybodydata);
        
      
          data.save(function (err) {
            if (err) {
              return res.send({ "flag": "0", "message": "Error in Record Insert" });
            } else {
              return res.send({ "flag": "1", "message": "Record Added" });
            }
          })
          
        }

      });
      
      
      
      
      router.get('/Contact-view-api', function (req, res, next) {
      
        Contactmodel.find(function (err, db_Contact_array) {
          if (err) {
            res.send({ 'error': 'An error has occurred' });
          } else {
         
            if(db_Contact_array.length > 0)
            {
              console.log(db_Contact_array);
              var count = db_Contact_array.length;
              var message = count + " Records Found";
      
              return res.end(JSON.stringify({db_Contact_array, "flag": "1", "message": message}));
           
      
            }else{
              return res.send({ "flag": "0", "message": "No Records Found" });
            }
          
      
          }
        });
      
      });
      
      
      
      
      //Get Single User By ID
      router.get('/Contact-view-details-api/:id', function (req, res) {
        console.log(req.params.id);
        Contactmodel.findById(req.params.id, function (err, db_Contact_array) {
          if (err) {
            res.send({ 'error': 'An error has occurred' });
          } else {
         
            if(db_Contact_array)
            {
              console.log(db_Contact_array);
             
              var message =  " Records Found";
      
              return res.end(JSON.stringify({db_Contact_array, "flag": "1", "message": message}));
         
      
            }else{
              return res.send({ "flag": "0", "message": "No Records Found" });
            }
          
      
          }
        });
      });
      router.get('/Contact-delete/:id', function(req, res, next) {
     
        console.log(req.params.id);
        Contactmodel.findByIdAndDelete(req.params.id,function(err,db_Contact_array){
      
          if(err){
            console.log("Error is Single Recode Fetch "+err);
            return res.send({ "flag": "0", "message": "No Records Found" });
          }
          else{
            console.log("Recode Delete");
            var message =  " Records Delete";

            return res.end(JSON.stringify({ "flag": "1", "message": message}));
          }
      
        });
      });

module.exports = router;