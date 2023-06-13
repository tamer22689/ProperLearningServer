const {Schema,model} = require("mongoose");

const LecturerSchema = new Schema({
    id:{
        type:String,
    },
    name:{
        type:String
    },
    description:{
        type:String
    },
    imageUrl:{
        type:String
    },
});


const LecturerModel = model("lecturers",LecturerSchema);
module.exports = LecturerModel;
