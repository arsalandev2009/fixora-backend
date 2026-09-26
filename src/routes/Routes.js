import { Router } from "express";
import {  Complain, deleteUserComplaint, getCustomersForAdmin, getuser,  getUserComplaint,  getUserComplaintForAdmin,  Login, Signup, updateComplaintStatus } from "../controllers/AuthController.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";

export const Routes  = Router()

Routes.post('/login',Login)
Routes.post('/signup',Signup)
Routes.post('/usercomplaint',authMiddleware,Complain)
Routes.get('/getUser',authMiddleware,getuser)
Routes.get('/getUserComplaint',authMiddleware,getUserComplaint)
Routes.get('/getUserComplaintForAdmin',authMiddleware,getUserComplaintForAdmin)
Routes.get('/getCustomersForAdmin',authMiddleware,getCustomersForAdmin)
Routes.delete('/deleteUserComplaint/:complainID',authMiddleware,deleteUserComplaint)
Routes.put('/updateComplainStatus/:id',authMiddleware,updateComplaintStatus)