import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async(req,res)=>{
   try {
     const {username,email,password} = req.body;
 
     if ( !username || !email || !password) {
         return res.status(400).json({
             success: false,
             message: "ALL FIELDS REQUIRED",
         });
     }

     // check user exists 

     const existingUser = await User.findOne({email});

     if (existingUser) {
        return res.status(400).json({
            success: false,
            message: "USER ALREADY EXISTS",
        });
     }
 
     // hash password
 
     const hashedPassword = await bcrypt.hash(password,10);
 
     // save user
     const user = await User.create({
         username,
         email,
         password: hashedPassword,
     });
 
 
     res.status(201).json({
         success: true,
         message: "USER REGISTERED",
     });
   } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
   }
};

const login = async (req,res) => {

   try {
     const {email,password} = req.body;
 
     // check user

      const user = await User.findOne({email});
     if (!user) {
         return res.status(400).json({
             success: false,
             message: "INVALIED CREDENTIALS",
         });
     }
 
     // compare password
 
     const isMatch = await bcrypt.compare(password,user.password);
 
     if (!isMatch) {
         return res.status(400).json({
             success: false,
             message: "INVAlIED CREDENTIALS",
         });
     }
 
     // generate token
 
     const token = jwt.sign(
         { id: user._id},
         process.env.JWT_SECRET,
         {expiresIn: "7d"}
     );
     console.log("LOGIN TOKEN:", token);
 
     res.json({
         success: true,
         token,
     });

   } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
   }
};

export {register,login}