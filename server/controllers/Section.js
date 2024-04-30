const Section=require("../models/Section");
const Course=require("../models/Course");

//create section handler
exports.createSection=async (req,res)=>{
try{
    //data fetch
    const{sectionName,courseId}=req.body;
    //validation
    if(!sectionName||!courseId){
        return res.status(400).json({
            succes:false,
            message:'all fiels are required',
        });
    }
    //create section
    const newSection =await Section.create({sectionName});
    //update course with section id 
    const updatedCourse= await Course.findByIdAndUpdate(
        courseId,{
            $push:{
                courseContent:newSection._id,
            }
                
            },
            {new:true},
           //hw:use populate
    )   
    .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    //hw:use populate
    // return responce
    return res.status(200).json({
        succes:true,
        message:'section created succesfully',
        updatedCourse,

    });
}
catch(error){
    console.error(error);
    return res.status(500).json({
        succes:false,
        message:'failed to create section',
        error:error.message,

    });
}
};


//update section in course
exports.updateSection =async (req,res)=>{
    try{
  //data fetch
   const{sectionName,sectionId}=req.body;
   //velidation
  if(!sectionName||!sectionId){
    return res.status(400).json({
        succes:false,
        message:'all fiels are required',
    });
    }
    //update in course
    const section= await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true},);
        // return responce
        return res.status(200).json({
            succes:true,
            message:'section updated succesfully',
          
    
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            succes:false,
            message:'failed to update section',
            error:error.message,
    
        });
    }
};




//delete section in course and update 

exports.deleteSection =async (req,res)=>{
    try{
  //data fetch
   const{sectionId}=req.params;
   
 
    //use find by id and delete in course
    await Section.findByIdAndDelete(sectionId);
        // return responce
        return res.status(200).json({
            succes:true,
            message:'section deleted succesfully',
        
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            succes:false,
            message:'failed to delete section',
            error:error.message,
    
        });
    }
}