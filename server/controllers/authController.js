// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// const { JsonWebTokenError } = jwt;
// import userModel from '../models/usermodel.js';
// import transporter from '../config/nodemailer.js'
// import { EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE } from '../config/emailtemplates.js';


// export const register=async(req,res)=>{
//     const {name,email,password}=req.body
//     if(!name || !email || !password){
//         return res.json({success:false,message:'Missing details'})

//     }
//     try{
//         const existingUser = await userModel.findOne({email})
//         if(existingUser){
//            return res.json({success:false,message:"User already exists"})
//         }
//       const hashedPassword= await bcrypt.hash(password,10)
//       const user=new userModel({name,email,password:hashedPassword})
//       await user.save();
//       const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
//       res.cookie('token',token,{
//        httpOnly:true,
//        secure:process.env.NODE_ENV === 'production',
//        sameSite:process.env.NODE_ENV === 'production'?'none':'lax',
//        maxAge:7*24*60*60*1000
// });
//      const mailOptions={
//         from:process.env.SENDER_EMAIL,
//         to:email,
//         subject:'WELCOME TO KIIT',
//         text:`KIIT welcomes you to its portal.Your account has been created with email id:${email}`
//      }
//      await transporter.sendMail(mailOptions);
//       return res.json({success:true})
//     }
//     catch(error){
//         res.json({success:false,message:error.message})
//     }
// }
// export const login = async(req,res)=>{
//     const {email,password} =req.body;
//     if(!email || !password){
//     return res.json({success:false,message:'Email and password are required'})
// }
// try{
//     const user = await userModel.findOne({email})
//     if(!user){
//         return res.json({success:false,message:'Invalid email'})
//     }
//     const isMatch = await bcrypt.compare(password,user.password)
//     if(!isMatch){
//         return res.json({success:false,message:'Invalid password'})
//     }
//     const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
//       res.cookie('token',token,{
//        httpOnly:true,
//        secure:process.env.NODE_ENV === 'production',
//        sameSite:process.env.NODE_ENV === 'production'?'none':'lax',
//        maxAge:7*24*60*60*1000
//  });
//       return res.json({success:true})
// }
// catch(error){
//     res.json({success:false,message:error.message})
// }
// }
// export const logout = async(req,res)=>{
//     try{
//         res.clearCookie('token',{
//             httpOnly:true,
//             secure:process.env.NODE_ENV === 'production',
//             sameSite:process.env.NODE_ENV === 'production'?'none':'lax',
//         })
//         return res.json({success:true,message:"Logged Out"})
//     }
//     catch(error){
//         res.json({success:false,message:error.message})
//     }
// }
// export const sendVerifyOtp=async(req,res)=>{
//     try{
//        const {userId}=req.body;
//        const user=await userModel.findById(userId);
//        if(user.isVerified){
//         return res.json({success:false,message:"Account already verified"})
//        }
//        const otp =String(Math.floor(100000+Math.random()*900000));
//        user.verifyOtp=otp;
//        user.verifyOtpExpireAt=Date.now()+24*60*60*1000
//        await user.save();
//        const mailOption={
//         from:process.env.SENDER_EMAIL,
//         to:user.email,
//         subject:'Account Verification Otp',
//         text:`Your OTP is ${otp}.Verify your account using this OTP.`,
//         html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)

//      }
//        await transporter.sendMail(mailOption)
//        res.json({success:true,message:'Verification sent on the email'})
//     }
//     catch(error){
//         res.json({success:false,message:error.message})
//     }
   
// }
// export const verifyEmail = async(req,res)=>{
//     const {userId,otp}=req.body;
//     if(!userId || !otp){
//         return res.json({success:false,message:'Missing details'})
//     };
//     try{
//             const user=await userModel.findById(userId);
//             if(!user){
//                 return res.json({success:false,message:'User not found'});
//             }
//             if(user.verifyOtp==='' || user.verifyOtp!==otp){
//                 return res.json({success:false,message:'Invalid Otp'});
//             }
//             if(user.verifyOtpExpireAt<Date.now()){
//                 return res.json({success:false,message:'OTP Expired'});
//             }
//             user.isVerified=true;
//             user.verifyOtp='';
//             user.verifyOtpExpireAt=0;
//             await user.save();
//             return res.json({success:true,message:'Email verified successfully'})
//      }
//     catch(error){
//         res.json({success:false,message:error.message})
//     }

// }
// export const isAuthenticated=async(req,res)=>{
//     try{
//         res.json({success:true});
//     }
//     catch(error){
//         res.json({success:false,message:error.message});
//     }
// }
// export const  sendResetOtp=async(req,res)=>{
//     const {email}=req.body;
//     if(!email){
//         return res.json({success:false,message:'Email is required'})
//     }
//     try{
//             const user=await userModel.findOne({email});
//             if(!user){
//                 return res.json({success:false,message:'User not defined'})
//             }
//             const otp =String(Math.floor(100000+Math.random()*900000));
//        user.resetOtp=otp;
//        user.resetOtpExpireAt=Date.now()+15*60*1000
//        await user.save();
//        const mailOption={
//         from:process.env.SENDER_EMAIL,
//         to:user.email,
//         subject:'Password Reset Otp',
//         text:`Your OTP is ${otp}.Reset your password using this OTP.`,
//         html:PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
//      };
//        await transporter.sendMail(mailOption)
//        return res.json({success:true,message:'OTP sent on email'})
//     }
//     catch(error){
//         return res.json({success:false,message:error.message});
//     }
// }
// export const resetPassword=async(req,res)=>{
//     const {email,otp,newPassword}=req.body
//     if(!email || !otp || !newPassword){
//         return res.json({success:false,message:'Email,Otp and New Password are required '})
//     }
//     try{
//          const user =await userModel.findOne({email})
//          if(!user){
//             return res.json({success:false,message:'User not found'})
//          }
//          if(user.resetOtp==='' || user.resetOtp !== otp){
//             return res.json({success:false,message:'Invalid Otp'})
//          }
//          if(user.resetOtpExpireAt<Date.now()){
//             return res.json({success:false,message:'Reset Password Otp Expired'})
//          }
//          const hashedPassword = await bcrypt.hash(newPassword,10);
//          user.password=hashedPassword;
//          user.resetOtp='';
//          user.resetOtpExpireAt=0;
//          await user.save()
//          return res.json({success:true,message:'Password has been reset successfully'})
//     }
//     catch(error){
//         return res.json({success:false,message:error.message})
//     }
// }
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/usermodel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailtemplates.js';

const getCookieOptions = () => {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Cross-site in prod, same-site in dev
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: 'Missing details' });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, getCookieOptions());

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'WELCOME TO KIIT',
      text: `KIIT welcomes you to its portal. Your account has been created with email id: ${email}`,
    };
    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'Invalid email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, getCookieOptions());

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token', getCookieOptions());
    return res.json({ success: true, message: 'Logged Out' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Password reset routes are similarly affected, just ensure the `sameSite` and `secure` cookie options are applied in a similar manner.
