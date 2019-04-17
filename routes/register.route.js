const express = require('express');
const app = express();
const registerRoutes = express.Router();

// Require register model in our routes module
let Register = require('../schema/Register');

// Defined store route
registerRoutes.route('/add').post(function (req, res) {
  let register = new Register(req.body);
  register.save()
    .then(register => {
      res.status(200).json({'register': 'register in added successfully'});
    res.redirect('/');
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
registerRoutes.route('/').get(function (req, res) {
    Register.find(function (err, Registeres){
    if(err){
      console.log(err);
    }
    else {
      res.json(registeres);
    }
  });
});

// Defined edit route
registerRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Register.findById(id, function (err, register){
      res.json(register);
  });
});

//  Defined update route
registerRoutes.route('/update/:id').post(function (req, res) {
    register.findById(req.params.id, function(err, next, register) {
    if (!register)
      return next(new Error('Could not load Document'));
    else {
        register.Name = req.body.Name;
        register.Email = req.body.Email;
        register.Password = req.body.Password;

        register.save().then(register => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
registerRoutes.route('/delete/:id').get(function (req, res) {
    Register.findByIdAndRemove({_id: req.params.id}, function(err, register){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = registerRoutes;
