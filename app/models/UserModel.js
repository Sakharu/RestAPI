let mongoose=require('mongoose');
mongoose.Promise=global.Promise;
let Schema = mongoose.Schema;
let UserSchema = new Schema({
    name:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    mail:
    {
        type:String,
        required:true,
        unique:true
    },
    admin:
    {
        type:Boolean,
        defualt:false
    }

});



var UserModel = mongoose.model("user", UserSchema);

module.exports=UserModel;