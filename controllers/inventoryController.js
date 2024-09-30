const mongoose = require('mongoose');
const userModel = require("../models/userModel");
const inventoryModel=require("../models/inventoryModel");

const createInventoryController = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });
        
        // Check if user exists
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
       /* if(inventoryType==="in" && user.role!=='donor'){
            return res.status(404).send({
                success: false,
                message: 'Not a donor account'
            })}
        if(inventoryType==="out" && user.role!=='hospital'){
            return res.status(404).send({
                success: false,
                message: 'Not a hospital'
            });
         
        }*/
        if(req.body.inventoryType=="out"){
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood =req.body.quantity;
            const organisation=new mongoose.Types.ObjectId(req.body.userId);
            const totalInOfRequestedBloood = await inventoryModel.aggregate([
                {$match:{
                    organisation,
                    inventoryType:"in",
                    bloodGroup:requestedBloodGroup
                }},{
                   $group :{
                    _id:'$bloodGroup',
                    total:{$sum:'$quantity'}
                   }
                }  
            ])
            //console.log("Total In ",totalInOfRequestedBloood);
            const totalIn=totalInOfRequestedBloood[0]?.total||0;
            const totalOutOfRequestedBloodGroup =await inventoryModel.aggregate([
                {$match:{
                    organisation,
                    inventoryType:"out",
                    bloodGroup:requestedBloodGroup
                }},
                {
                    $group:{
                     _id:'$bloodGroup',
                     total:{$sum:'$quantity'}   
                    },
                },
            ]);
            const totalOut= totalOutOfRequestedBloodGroup[0]?.total || 0;
            //in and out clac
            const availableQuantityOfBloodGroup=totalIn-totalOut;
            if(availableQuantityOfBloodGroup<requestedQuantityOfBlood){
                return res.status(500).send({
                    success:false,
                    message:`Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`
                });
            }
            req.body.hospital=user?._id;

        }
        else{
            req.body.donor =user?._id;
        }
        const inventory=new inventoryModel(req.body);
        await inventory.save();
        return res.status(201).send({
            success:true,
            message:"New blood record added",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in create Inventory API",
            error
        });
    }
};
const getInventoryController= async(req,res)=>{
    try{
        const inventory=await inventoryModel.find({
            organisation:req.body.userId,
        }).populate('donor').populate('hospital').sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:'get all records successfully',
            inventory
        });
    }catch{
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in  get all inventory',
            error
        });
    }
};
const getInventoryHospitalController= async(req,res)=>{
    try{
        const inventory=await inventoryModel.find(req.body.filters).populate('donor').populate('hospital').populate("organisation").sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:'get all records successfully',
            inventory
        });
    }catch{
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in  consumer inventory',
            error
        });
    }
};
//get donor records
const getDonor=async (req,res)=>{
    try{
        const organisation = req.body.userId;
        const donorId= await inventoryModel.distinct("donor",{
            organisation,
        });
        //console.log(donorId);
        const donors = await userModel.find({_id:{$in:donorId}});
        return res.status(200).send({
            success:true,
            message:"donor record fetched successfully",
            donors,
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Donor records",
            error,
        });
    }
};
const getHospitalController = async(req,res)=>{
    try{
        const organisation =req.body.userId;
        const hospitalId = await inventoryModel.distinct('hospital',{organisation});
        const hospitals = await userModel.find({
            _id:{$in:hospitalId},
        });
        return res.status(200).send({
            success:true,
            message:"Hospitals Data fetched successfully",
            hospitals,
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in get hospital API',
            error
        });
    }
};
const getOrganisationController = async(req,res)=>{
    try{
        const donor = req.body.userId;
        const orgId = await inventoryModel.distinct('organisation',{donor});
        const organisations = await userModel.find({
            _id:{$in:orgId}
        });
        return res.status(200).send({
           success:true,
           message:"ORG Data fetched successfully",
           organisations, 
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in ORG API',
            error
        });
    }
};
const getRecentInventoryController=async (req,res)=>{
    try{
        const Inventory = await inventoryModel.find({
            organisation:req.body.userId
        }).limit(3).sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:"recent Inventory Data",
            inventory,
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Recent Inventory API",
            error,
        });
    }
};
const getOrganisationForHospitalController = async(req,res)=>{
    try{
        const hospital = req.body.userId;
        const orgId = await inventoryModel.distinct("organisation",{hospital});
        const organisations = await userModel.find({
            _id:{$in:orgId}
        });
        return res.status(200).send({
           success:true,
           message:"hospital ORG Data fetched successfully",
           organisations, 
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in Hospital ORG API',
            error
        })
    }
};

module.exports = { createInventoryController,getInventoryController,getDonor ,getHospitalController,getOrganisationController,getOrganisationForHospitalController,getInventoryHospitalController,getRecentInventoryController};
