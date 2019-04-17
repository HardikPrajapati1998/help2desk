var  mongoose = require("mongoose");
var Schema = mongoose.Schema;
var material_schema = new Schema({

    Material_title:String,
    Material_detail:String,
    Material_upload:String,
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_date:{ type: Date, default: Date.now },
updated_date:{ type: Date, default: Date.now }
   
    
    });
module.exports = mongoose.model('Material',material_schema);