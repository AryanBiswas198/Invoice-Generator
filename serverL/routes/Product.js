const express = require("express");
const router = express.Router();

const {
    addProduct,
    removeProduct,
    updateProductQuantity,
    calculateTotalRate,
    getAllUserProducts,
} = require("../controllers/Product");

const {auth} = require("../middlewares/auth");


router.post("/addProduct", auth, addProduct);

router.delete("/removeProduct", auth, removeProduct);

router.put("/updateProductQuantity", auth, updateProductQuantity);

router.get("/calculateTotalRate", auth, calculateTotalRate);

router.get("/getAllUserProducts", auth, getAllUserProducts);


module.exports = router;