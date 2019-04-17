var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
fname:String,
lname:String,
ename:String,
gname:String,
flname:String,
pname:String,
created_date:{ type: Date, default: Date.now },
updated_date:{ type: Date, default: Date.now }                                             
});

module.exports = mongoose.model('student',myschema);