const mongoose = require('mongoose');

const NotesSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title : {
        type:String,
        requied:true
    },
    description : {
        type:String,
        requied:true
    },
    tag : {
        type:String,
        default: "General"
    },
    date : {
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("notes",NotesSchema);