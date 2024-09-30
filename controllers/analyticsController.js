const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");
const bloodGroupDetailsController = async(req,res)=>{
    try{
        const BloodGroups = ["O+","O-","AB+","AB-","A+","A-","B+","B-"];
        const bloodGroupData = [];
        const organisation = new mongoose.Types.ObjectId(req.body.userId);
        await Promise.all(BloodGroups.map(async(bloodGroup)=>{
            const totalIn =await inventoryModel.aggregate([
                {$match:{
                    bloodGroup:bloodGroup,
                    inventoryType:"in",
                    organisation,
                }
                },
                {
                    $group:{
                        _id:null,
                        total:{$sum :"$quantity"},
                    },
                },
            ]);
            const totalOut =await inventoryModel.aggregate([
                {$match:{
                    bloodGroup:bloodGroup,
                    inventoryType:"in",
                    organisation,
                }
                },
                {
                    $group:{
                        _id:null,
                        total:{$sum :"$quantity"},
                    },
                },
            ]);
            const availableBlood=(totalIn[0]?.total || 0) -(totalOut[0]?.total || 0);
            bloodGroupData.push({
                bloodGroup,
                totalIn:totalIn[0]?.total || 0,
                totalOut:totalOut[0]?.total || 0,
            })
        }));
        return res.status(200).send({
            success:true,
            message:"Error in BloodGroup Dta analytics API",
            bloodGroupData
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in BLoodGroups Data analytics API",
            error,
        });
    }
};

module.exports = {bloodGroupDetailsController};