var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var category_schema = new Schema({

Category_name:String,
created_date:{ type: Date, default: Date.now },
updated_date:{ type: Date, default: Date.now }


});
module.exports = mongoose.model('Category',category_schema);