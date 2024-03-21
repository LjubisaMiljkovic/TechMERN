const mongoose = require('mongoose');
const {Schema}=mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username:{
        type:String,
        required:[true, 'User neme is required'],
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        lowercase:true,
        trim:true,
        unique:true,
        // match:[/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/, 'Email is not valid']

    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        // validate:{
        //     validator:function(password){
        //         const regexPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
        //          return regexPassword.test(password);
        //     },
        //     message: 'Password nije validan'
        // }
    },
    role:{
        type:String,
        enum:['admin', 'user'],
        default:'user'
    },
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    postCode:{
        type:String
    },
    votedFor:{
        type:Array,
    }
});

userSchema.pre('save',async function (next) {
    if (!this.isModified('password')) return next();                           //ako je menjan samo username
    this.password = await bcrypt.hash(this.password,12);
})
const UserModel=mongoose.model('users', userSchema);
module.exports=UserModel;