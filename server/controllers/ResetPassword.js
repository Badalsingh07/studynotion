const User =require("../models/User");
const mailSender =require("../utils/mailSender");
const bcrypt=require("bcrypt");
//reset password token
exports.resetPasswordToken = async (req,res)=>{
    try{
        //get email from req body
        const email =req.body.email;

        //check user for this email,email validation
        const user =await User.findOne({email});
        if(!user){
            return res.json({
                succes:false,
                message:'your email is not registerd in this email id',

            });

        }
        //generate token
        const token = crypto.randomUUID();

        //update user by adding token and expiration time
        const updatedDetails=await User.findOneAndUpdate(
            {email:email},
        {
            token:token,
            resetPasswordExpires:Date.now()+5*60*1000,
        },{new:true});
        //create url
        const url=`http://localhost:3000/update-password/${token}`
        //send mail containing the url
        await mailSender(email,
            "Password Reset LInk",
            `Password reset url:${url} `);
        //return responce
        return res.json({
            succes:true,
            message:'Email sent successfully,plese check email and reset password',

        });
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'something went wrong while reset password in front part ',
              });



    }
}
//resetPassword 
exports.resetPassword=async (req,res)=>{
   try{
   //data fetch
   const {password,confirmPassword,token}=req.body;

    //validation
    if(password!==confirmPassword){
        return res.json({
            succes:false,
            message:'password not matching',

        });
    }
    //get userdetail from db using tokens
    const userDetails =await User.findOne({token:token});
    //if no entry -invalid token
    if(!userDetails){
        return res.json({
            succes:false,
            message:'token is invalid in reset password ',

        });
    }
    //token time check
    if(userDetails.resetPasswordExpires < Date.now()){
        return res.json({
            succes:false,
            message:'token time is expire plese create new time expire ',

        });

    }
    //hash pwd 
    const hashedPassword=await bcrypt.hash(password,10);
    //password update 
    await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true},
        );
    //return responce
        return res.json({
            succes:true,
            message:'password reset succesfully',

        });
        
   }
   catch(error){
    return res.status(500).json({
        success:false,
        message:'something went wrong while reset password ',
          });

   }
}