const {Schema,model} = require("mongoose");

const UserSchema = new Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
});

const UserModel = model("users",UserSchema);
module.exports = UserModel;