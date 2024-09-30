const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createInventoryController, getInventoryController, getDonor, getHospitalController, getOrganisationController, getInventoryHospitalController, getRecentInventoryController } = require('../controllers/inventoryController');
const router =express.Router()

//add inventory
router.post('/create-inventory',authMiddleware,createInventoryController);

//get all blood records
router.get('/get-inventory',authMiddleware,getInventoryController);

router.get("/get-inventory",authMiddleware,getRecentInventoryController);

router.post("/get-inventory",authMiddleware,getInventoryHospitalController);

router.get("/get-donors",authMiddleware,getDonor);

router.get("/get-hospitals",authMiddleware,getHospitalController);

router.get("/get-organisation",authMiddleware,getOrganisationController);

router.get("/get-organisation-for-hospital",authMiddleware,getOrganisationController);
module.exports=router;