import mongoose from "mongoose";

export const User = mongoose.model('User',new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    }
},{timestamps:true})) 


export const UserComplaint = mongoose.model('UserComplaint',new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    complainID:{
        type:String,
        unique:true,
        required:true,
    },
    applianceImage:{
        type:String,
    },
    appliance:{
        type:String,
        required:true
    },
    problem:{
        type:String,
        required:true
    },
    serviceType:{
        type:String,
        required:true
    },
    serviceAddress:{
        type:String,
        required:true 
    },
    additionalInformation:{
        type:String,
        required:false
    },
    status:{
        type:String,
        enum:['PENDING','COMPLETED','CANCELLED'],
        default:'PENDING'
    }
},{timestamps:true}))