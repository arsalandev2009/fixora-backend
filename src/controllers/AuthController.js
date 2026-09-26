import { User, UserComplaint } from "../models/authSchema.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'




export const Login = async (req, res) => {
try {
      const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields Required" });
    return;
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    res
      .status(400)
      .json({ message: "User Not Registered Please Signup First" });
    return;
  }
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    res.status(400).json({ message: "Invalid Credentials" });
    return;
  }
  const token = jwt.sign({ userId: existingUser._id },process.env.JWT_SECRET,{ expiresIn: "5hr" });
  res.status(201).json({ message: "User Login Successfully", success: true,role:'user', token });
} catch (error) {
    res.status(400).json({message:error})
}
};

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields Required", success: false });
      return;
    }
    const ExistingUser = await User.findOne({ email });
    if (ExistingUser) {
      res.status(400).json({ message: "User Already Exist", success: false });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashPassword });
    res
      .status(201)
      .json({ message: "User Created Successfully", success: true });
  } catch (error) {
    res.json({ message: "Error" });
  }
};

export const Complain = async(req,res)=>{
const complainID = `FX_${Math.floor(1000 + Math.random() * 9000)}`
try {
  const {applianceImage,appliance,problem,serviceType,serviceAddress,additionalInformation}=req.body

  if(!appliance || !problem || !serviceType || !serviceAddress ){
    res.status(400).json({message:'all fields required',success:false})
    return
  }
  if(serviceType.toLowerCase() === 'normal'){
    UserComplaint.create({
      userId: req.user.userId,
      complainID,
      applianceImage,
      appliance,
      problem,
      serviceType,
      serviceAddress,
      additionalInformation
    })
      res.status(200).json({message:'Complaint Generated Sucessfully',success:true})
  }else if(serviceType.toLowerCase() === 'fast'){
    res.status(400).json({message:'payment karo'})
  }
} catch (error) {
  console.log('Data Adding error' + error)
}
};

export const getuser = async (req,res)=>{
try {
    const user = await User.findById(req.user.userId).select('-password')
    if(!user){
      res.status(400).json({message:'User not found'})
      return
    }
    res.status(200).json({user})
} catch (error) {
  res.status(500).json({message:'server error'})
}
}

export const getUserComplaint = async(req,res)=>{
try{
  const complaints = await UserComplaint.find({userId:req.user.userId,}).sort({createdAt:-1});
  res.status(200).json({complaints})
}catch(error){
  console.log(error)
}
}

export const getUserComplaintForAdmin = async (req,res)=>{
try {
    const complaints = await UserComplaint.find()
  res.status(200).json({complaints})
} catch (error) {
    res.status(400).json({message:'error'})
}
}

export const getCustomersForAdmin = async (req,res)=>{
try {
    const customers = await User.find()
  res.status(200).json({customers})
} catch (error) {
    res.status(400).json({message:'error'})
}
}

export const deleteUserComplaint = async(req,res)=>{
  const complainID = req.params.complainID;
  await UserComplaint.findOneAndDelete(complainID)
  res.json({message:'done'})
}

export const updateComplaintStatus = async(req,res)=>{
  const {id} = req.params;
  const {status} = req.body
  if(!status && !id){
    res.json({message:'server error'})
    return
  }
  const updatedComplaint=await UserComplaint.findByIdAndUpdate(id,{status:status},{new:true})
  res.json({message:'Updated Successfully',updatedComplaint})
}