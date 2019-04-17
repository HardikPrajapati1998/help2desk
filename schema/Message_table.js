var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var message_schema = new Schema({

Message_detail:String,
Message_date:Date,
Message_time:Date,
created_date:{ type: Date, default: Date.now },
updated_date:{ type: Date, default: Date.now }


});
module.exports = mongoose.model('Message',message_schema);