/*const {instance}=require("../config/razorpay");
const course=require("../models/Course");
const User =require("../models/User");
const mailSender =require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");
const { json } = require("express");

//capture the payment and initiate order
exports.capturePayment=async(req,res)=>{
   
        //get cousre id and user id
        const{course_id}=req.body;
        const user_id=req.User.id; 
        //validation
        if(!course_id){
            return res.status(400).json({
                succes:false,
                message:'courseId not valid',
            });
        } 
        //valid courseDetails
        let course;
        try{
            course =await Course.findById(course_id);
            if(!course){
                return res.status(400).json({
                    succes:false,
                    message:'coursedetails are not available',
                });
            }
             //check user alrady pay for same course
             const uid=mongoose.Types.ObjectId(user_id);
             if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    succes:false,
                    message:'student are alrady enrolled ',
                });
             }

            
        }
        catch(error){
            console.error(error);
            return res.status(500).json({
                succes:false,
                error:error.message,
        
            });
        }
       
     //order create
       const amount=course.price;
       const currency="INR";
       const options={
        amount:amount*100,
        currency,
        receipt: Math.random(Date.now()).toString,
        notes:{
            courseId:course_id,
            user_id,
        }

       };

       try{
            //initaiate the payment using razorpay
            const paymentResponce=await instance.orders.create(options);
            console.log(paymentResponce);
            //return responce
            return res.status(200).json({
                succes:true,
                courseName:course.courseName,
                couseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponce.id,
                currency:paymentResponce.currency,
                amount:paymentResponce.amount,

            });
         }
       catch(error){
        console.log(error);
        return res.status(500).json({
            succes:false,
           message:'could not initiate order'
    
        });
       }
    };


    //verify Signature
    exports.verifySignature=async (req,res)=>{
        const webHookSecret="12345678";
        const Signature=req.headers["x-razorpay-signature"];
        const shasum= crypto.createHmac("sha256",webHookSecret);
        shasum.update(json.stringify(req.body));
        const digest=shasum.digest("hex");
        if(shasum===digest){
            console.log("Payment is Authorized");

            const {courseId,userId}=req.body.payload.payment.entity.notes;
            try{
                    // fulfill the action

                    //find the course and enroll the student in it 
                    const enrolledCourse=await Course.findByIdAndUpdate(
                        {_id:courseId},
                        {
                            $push:{
                                studentsEnrolled:userId,
                            }
                        },{new:true},
                    );
                    //validation
                    if(!enrolledCourse){
                        return res.status(500).json({
                            succes:false,
                            message:'course are not found',
                        });

                    }
                    console.log(enrolledCourse);
                    //find the student and add the course to the list enrolled course me
                    const enrolledStudent=await Course.findByIdAndUpdate(
                        {_id:userId},
                        {
                            $push:{
                                courses:courseId,
                            }
                        },{new:true},
                    );
                    console.log(enrolledStudent);

                    //mail send kr do confirmation wala
                    const emailResponce= await mailSender(
                        enrolledStudent.email,
                        "Congratulation from codeHelp",
                        "Congratulation,you are ordered new course",
                    );
                    //return responce
                    return res.status(200).json({
                        succes:true,
                        message:'signature varified and course added',
                    });
                } 

            
            catch(error){
                console.error(error);
                return res.status(500).json({
                    succes:false,
                    error:error.message,
            
                });
            }
          }
     else{
            return res.status(400).json({
                succes:false,
                message:'inavlid request',     
             });
     }
    
    };
 
    */
    const {instance} = require("../config/razorpay");
    const Course = require("../models/Course");
    const User = require("../models/User");
    const mailSender = require("../utils/mailSender");
    const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
    const { default: mongoose } = require("mongoose");
    const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
    const crypto = require("crypto");
    const CourseProgress = require("../models/CourseProgress");
    
    //initiate the razorpay order
    exports.capturePayment = async(req, res) => {
    }
    
    
    //verify the payment
    exports.verifyPayment = async(req, res) => {
    }
    
    
    const enrollStudents = async(courses, userId, res) => {
    }
    
    exports.sendPaymentSuccessEmail = async(req, res) => {
    }
    
    