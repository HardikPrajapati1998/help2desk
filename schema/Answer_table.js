var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var answer_schema = new Schema({

Answer_detail =String,
Answer_date = Date,
Answer_time = Date,
created_date:{ type: Date, default: Date.now },
updated_date:{ type: Date, default: Date.now }

});

module.exports = mongoose.model('Answer',answer_schema);