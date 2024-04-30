const mongoose = require("mongoose");
const mailSender=require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
     otp:{
      type:String, 
      required:true, 
    },
     email:{
        type:String, 
        required:true, 
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }


});

//function -> to send email

async function sendVerificationEmail(email,otp) {
    try{
        const mailResponse = await mailSender(email,"verification code from StudyNotion",otp);
        console.log("Email sent successfully:",mailResponse);
    }
    catch(error){
        console.log("error occured while sending otp",error);
        throw error;
    }
}
OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})


module.exports = mongoose.model("OTP",OTPSchema);