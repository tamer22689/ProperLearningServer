const {Schema,model} = require("mongoose");

const ExamSchema = new Schema({
    name:{
        type:String
    },
    id:{
        type:String,
    },
    courseid:{
        type:String
    },
    questions:{
        type:Array
    },
    currectAnswers:{
        type:Array
    }

});


const ExamModel = model("exams",ExamSchema);
module.exports = ExamModel;