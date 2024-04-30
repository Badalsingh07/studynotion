const nodemailer=require("nodemailer");


const mailSender= async (email,title,body)=>{
    try{
       
          //transporter create krna hai
          let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
          });
          //send mail
          let info = await transporter.sendMail({
            from:'StudyNotion||badalsingh',
            to: `${email}`,
            subject:`${title}`,
            html:`${body}`,

          })
          console.log("info",info);
          return info;
    }
    catch(error){
        console.error(error);
    }
 }
module.exports=mailSender;
