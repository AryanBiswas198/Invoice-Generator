const Product = require("../models/Product");
const User = require("../models/User");

// Add Product Function
exports.addProduct = async (req, res) => {
  try {
    const { name, price} = req.body;

    const ownerId = req.user.id;

    const existingProduct = await Product.findOne({ name, owner: ownerId });

    // If a product with the same name already exists, return an error
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with the same name already exists",
      });
    }

    const product = await Product.create({
      name,
      price,
      owner: ownerId,
      // realId,
    });

    return res.status(200).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } 
  catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to add product",
    });
  }
};

// Remove Product Function
// exports.removeProduct = async (req, res) => {
//   try {
//     const { productId } = req.body;

//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found",
//       });
//     }

//     if (product.owner.toString() !== req.user.id) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not authorized to remove this product",
//       });
//     }

//     await Product.findByIdAndDelete(productId);

//     return res.status(200).json({
//       success: true,
//       message: "Product removed successfully",
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to remove product",
//     });
//   }
// };



exports.removeProduct = async (req, res) => {
  try {
    const { realId } = req.body;

    const product = await Product.findOne({realId: realId});

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to remove this product",
      });
    }

    await product.delete();

    return res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to remove product",
    });
  }
};

// Update Product Quantity Function
exports.updateProductQuantity = async (req, res) => {
    try {
      const { productId, newQuantity } = req.body;
  
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      if (product.owner.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to update the quantity of this product",
        });
      }
  
      const newQuantityInt = parseInt(newQuantity, 10);
  
      product.quantity = newQuantityInt;
      await product.save();
  
      return res.status(200).json({
        success: true,
        message: "Product quantity updated successfully",
        product,
      });
    } 
    catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Failed to update product quantity",
      });
    }
  };
  

exports.calculateTotalRate = async (req, res) => {
    try {
        const userProducts = await Product.find({ owner: req.user.id });

        let totalRate = 0;
        let totalGST = 0;

        userProducts.forEach(product => {
            const productTotal = product.quantity * product.price;
            totalRate += productTotal;
        });

        totalGST = totalRate * 0.18;

        return res.status(200).json({
            success: true,
            totalRate,
            totalGST,
        });
    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to calculate total rate",
        });
    }
};

// Get All Products Added by User
exports.getAllUserProducts = async (req, res) => {
    try {
        const userId = req.user.id;

        const userProducts = await Product.find({ owner: userId });

        return res.status(200).json({
            success: true,
            products: userProducts,
        });
    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve products",
        });
    }
};
