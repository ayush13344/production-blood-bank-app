const userModel = require("../models/userModel");

const getDonorListController =async(req,res)=>{
    try{
        const donorData=await userModel.find({role:"donor"}).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            TotalCount:donorData.length,
            message:"Donor list fetched successfully",
            donorData
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in donor list",
            error
        });
    }
};

const getHospitalListController =async(req,res)=>{
    try{
        const hospitalData=await userModel.find({role:"hospital"}).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            TotalCount:hospitalData.length,
            message:"Donor list fetched successfully",
            hospitalData
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in hospital list",
            error
        });
    }
};

const getOrgListController =async(req,res)=>{
    try{
        const orgData=await userModel.find({role:"organisation"}).sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            TotalCount:orgData.length,
            message:"Donor list fetched successfully",
            orgData
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Org list",
            error
        });
    }
};

const deleteDonorController=async(req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success:true,
            message:"Donor Record deleted succesfully"
        });
}catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error while deleting ",
            error
        });
}
};




module.exports={getDonorListController,getHospitalListController,getOrgListController,deleteDonorController};