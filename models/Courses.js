const {Schema,model} = require("mongoose");

const CourseSchema = new Schema({
    id:{
        type:String,
    },
    title:{
        type:String,
    },
    description:{
        type:String
    },
    imageUrl:{
        type:String
    },
    lecturer:{
        type:String
    },
    rating:{
        type:Number
    },
});


const CourseModel = model("courses",CourseSchema);
module.exports = CourseModel;