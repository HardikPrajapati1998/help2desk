var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blog_schema = new Schema ({

Blog_name:String,
Blog_detail:String,
Blog_date : Date,
Blog_time : Date,

});
module.exports = mongoose.model('Blog',blog_schema);