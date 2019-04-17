var express = require('express');
var router = express.Router();
var Questionmodel = require('../schema/Question_table');
var UsersModel = require('../schema/User_table');
/* GET users listing. */
router.get('/', function (req, res, next) {
  var mysession = req.session.email;
  if (!mysession) {
    res.redirect('/');
  }
  res.render('question_add');

});



router.get('/show/:id', function (req, res, next) {
  var mysession = req.session.email;
  if (!mysession) {
    res.redirect('/');
  }
  console.log(req.params.id);
  UsersModel.findById(req.session.userid, function (err, db_user_array) {
    Questionmodel.findById(req.params.id, function (err, db_question_array) {

      if (err) {
        console.log("Error is Single Recode Fetch " + err);
      }
      else {
        console.log(db_question_array);
        res.render('question-detial', { Question_array: db_question_array, user_array: db_user_array });
      }
    });

  });
});

router.get('/question_display', function (req, res, next) {
  var mysession = req.session.email;
  if (!mysession) {
    res.redirect('/');
  }

  Questionmodel.find(function (err, data) {

    if (err) {
      console.log("Error In  Fetch Data " + err)
    }
    else {
      console.log(data);
      res.render('question/question_display', { Question_array: data });
    }

  });


});


router.post('/question-proess', function (req, res, next) {


  const mybodydata = {
    Question_title: req.body.Question_title,
    Question_Tag: req.body.Question_Tag,
    Question_detail: req.body.Question_detail,
    user_id: req.session.userid

  }
  console.log(mybodydata);
  var data = Questionmodel(mybodydata);

  data.save(function (err) {

    if (err) {
      console.log("Error In Insert Record");
    } else {
      res.redirect('/');
    }
  })
});

router.post('/answer-proess/:id', function (req, res, next) {
  var mysession = req.session.email;
  if (!mysession) {
    res.redirect('/login');
  }
  console.log("the anser body>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",req.body);
  Questionmodel.update({_id:req.params.id},{$push:{"Question_answer":req.body.Question_answer}})
    .then(questiondata => {
        
        res.redirect('/listing');
    })
    .catch(err => {
      console.log("err>>>>>>>>>>>>>>>>>>>>>>>>>>>>>..", err);
    })

});

router.get('/edit/:id', function (req, res, next) {
  var mysession = req.session.email;
  if (!mysession) {
    res.redirect('/');
  }
  console.log(req.params.id);

  Questionmodel.findById(req.params.id, function (err, db_question_array) {

    if (err) {
      console.log("Error is Single Recode Fetch " + err);
    }
    else {
      console.log(db_question_array);
      res.render('question/question_edite', { Question_array: db_question_array });
    }

  });
});


router.post('/edit/:id', function (req, res, next) {


  const mybodydata = {

    Question_detail: req.body.Question_detail,
    Question_title: req.body.Question_title,
    updated_date: Date()
  }

  Questionmodel.findByIdAndUpdate(req.params.id, mybodydata, function (err) {
    if (err) {
      console.log("Error in Recode Upadet");
      res.redirect('/form');

    } else {
      res.redirect('/question/question_display');
    }
  });
});


router.get('/delet/:id', function (req, res, next) {
  var mysession = req.session.email;
  if (!mysession) {
    res.redirect('/');
  }
  console.log(req.params.id);
  Questionmodel.findByIdAndDelete(req.params.id, function (err, db_question_array) {

    if (err) {
      console.log("Error is Single Recode Fetch " + err);
      res.redirect('question/question_display');
    }
    else {
      console.log("Recode Delet");
      res.redirect('/question/question_display');
    }

  });
});


// API CODE


router.post('/question-add-api', function (req, res, next) {
  console.log(req.body);

  if (!req.body) {
    return res.send({ "flag": "0", "message": "missing a parameter" });
  } else {

    const mybodydata = {
      Question_title: req.body.Question_title,
      Question_detail: req.body.Question_detail,
      Question_Tag: req.body.Question_Tag

    }
    var data = Questionmodel(mybodydata);


    data.save(function (err) {
      if (err) {
        return res.send({ "flag": "0", "message": "Error in Record Insert" });
      } else {
        return res.send({ "flag": "1", "message": "Record Added" });
      }
    })

  }







});




router.get('/question-view-api', function (req, res, next) {

  Questionmodel.find(function (err, db_question_array) {
    if (err) {
      res.send({ 'error': 'An error has occurred' });
    } else {

      if (db_question_array.length > 0) {
        console.log(db_question_array);
        var count = db_question_array.length;
        var message = count + " Records Found";

        return res.send(JSON.stringify({ db_question_array, "flag": "1", "message": message }));


      } else {
        return res.send({ "flag": "0", "message": "No Records Found" });
      }


    }
  });

});




//Get Single User By ID
router.get('/question-view-details-api/:id', function (req, res) {
  console.log(req.params.id);
  Questionmodel.findById(req.params.id, function (err, db_question_array) {
    if (err) {
      res.send({ 'error': 'An error has occurred' });
    } else {

      if (db_question_array) {
        console.log(db_question_array);
        var count = db_question_array;
        var message = " Records Found";

        return res.end(JSON.stringify({ count, "flag": "1", "message": message }));


      } else {
        return res.send({ "flag": "0", "message": "No Records Found" });
      }


    }
  });
});

router.get('/question-delete-api/:id', function (req, res, next) {

  console.log(req.params.id);
  Questionmodel.findByIdAndDelete(req.params.id, function (err, db_question_array) {

    if (err) {
      console.log("Error is Single Recode Fetch " + err);
      return res.send({ "flag": "0", "message": "No Records Found" });
    }
    else {
      console.log("Recode Delet");
      var message = " Records Delete";

      return res.end(JSON.stringify({ "flag": "1", "message": message }));
    }

  });
});



module.exports = router;