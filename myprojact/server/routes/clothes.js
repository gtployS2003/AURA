import express from "express";

const router = express.Router();
const { formDataValidator } = require("../Middlewares/formDataValidator");
const { analyzer } = require("../controllers/analyzer");
const { saveImages } = require("../Middlewares/saveImages");

router.post("/", formDataValidator, saveImages, analyzer);
module.exports = router;

const clothesRoutes = (req, res) => {
    // โค้ดจัดการ routes
  };
  
  export default clothesRoutes;