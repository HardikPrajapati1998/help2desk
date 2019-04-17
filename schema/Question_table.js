var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var question_schema = new Schema({

    Question_title: String,
    Question_detail: String,
    Question_Tag: String,
    Question_date: Date,
    Question_time: Date,
    Question_answer: [{ type: String }],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: Date.now }



});
module.exports = mongoose.model('Question', question_schema);