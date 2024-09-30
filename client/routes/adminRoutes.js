const express = require("express");
const router = express.Router();
const authMiddleware=require("../middlewares/authMiddleware");
const { getDonorListController, getHospitalListController, getOrgListController, deleteDonorController } = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");


router.get("/donor-list",authMiddleware,adminMiddleware,getDonorListController);

router.get("/hospital-list",authMiddleware,adminMiddleware,getHospitalListController);

router.get("/org-list",authMiddleware,adminMiddleware,getOrgListController);

router.delete("/delete-donor/:id",authMiddleware,adminMiddleware,deleteDonorController);
module.exports=router;