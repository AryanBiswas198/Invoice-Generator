const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        default: 1,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    id: {
        type: String,
        // required: true,
    },
    image: {
        type: String,
    },
    owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    }],
});

module.exports = mongoose.model("Product", productSchema);
