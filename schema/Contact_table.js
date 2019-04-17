var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Contact_schema = new Schema({
Contact_name:String,
Contact_email:String,
Contact_subject:String,
Contact_message:String,
Contact_date:Date,
Contact_time:Date,
created_date:{ type: Date, default: Date.now },
updated_date:{ type: Date, default: Date.now }

});

module.exports = mongoose.model('Contact',Contact_schema);