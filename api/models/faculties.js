const mongoose = require("mongoose");

const facultySchema = mongoose.Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    name : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        required : true
    },
    grade : {
        type : Number,
        required : true
    }
});

module.exports = mongoose.model("Faculty", facultySchema);