const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    name : {
        type : String,
        required : true
    },
    class : {
        type : Number,
        required : true,
        min : 1,
        max : 12
    }
});

module.exports = mongoose.model("Students", studentSchema);