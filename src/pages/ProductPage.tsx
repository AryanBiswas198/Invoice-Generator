import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductAPI, removeProductAPI, updateProductQuantityAPI } from "../services/operations/productAPI";
import { products } from "../data";

import { AppDispatch, RootState } from "../services/operations/productAPI";

type Product = {
    id: number;
    name: string;
    price: number;
    image: string; // Add image property to Product type
}

const ProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: RootState) => state.auth.token);

  const [selectedProducts, setSelectedProducts] = useState<{ [key: number]: number }>({});

  const handleAddProduct = async (product: Product) => {
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [product.id]: 1, // Set initial quantity to 1
    }));
    const response = await dispatch(addProductAPI(product, token));
    console.log("Printing response after data fetch - ", response);
  };

  const handleUpdateQuantity = (productId: any, newQuantity: number) => {
    console.log("Printing Quantity in product page: ", newQuantity);
    setSelectedProducts((prevSelectedProducts) => ({
      ...prevSelectedProducts,
      [productId]: newQuantity,
    }));
    dispatch(updateProductQuantityAPI(productId, newQuantity, token));
  };

  const handleRemoveProduct = (productId: any) => {
    const { [productId]: _, ...restSelectedProducts } = selectedProducts;
    setSelectedProducts(restSelectedProducts);

    dispatch(removeProductAPI(productId, token));
  };

  const getShortName = (name: string, maxLength: number = 20) => {
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
  };

const renderProductList = () => (
    <div className="flex flex-col justify-center w-full">
      {products.map((product) => (
        <div key={product.id} className="rounded-lg shadow-md p-4 mb-4">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 border-t-2 pt-8 border-green-50">
            <img src={product.image} alt={product.name} className="w-40 h-40 md:w-48 md:h-auto object-cover rounded-md mr-4" />
            <div className="flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-white mb-2">{product.name}</h2>
                <p className="text-gray-300 md:text-lg mb-3">Price: ${product.price}</p>
              </div>
              {selectedProducts[product.id] !== undefined ? (
                <div className="flex items-center space-x-5 my-2">
                  <button
                    onClick={() => handleUpdateQuantity(product.id, selectedProducts[product.id] - 1)}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold text-white">{selectedProducts[product.id]}</span>
                  <button
                    onClick={() => handleUpdateQuantity(product.id, selectedProducts[product.id] + 1)}
                    className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveProduct(product.id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddProduct(product)}
                  className="px-3 py-1 w-56 sm:w-48  text-white rounded-md mt-2"
                  style={{
                    background: "linear-gradient(to right, #667EEA, #764BA2)",
                    backgroundSize: "200% auto",
                    backgroundPosition: "right center",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundPosition = "right center")}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundPosition = "left center")}
                >
                  Add Product
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );


const renderCart = () => {
    const selectedProductDetails = products.filter((product) => selectedProducts[product.id] !== undefined);
    const total = selectedProductDetails.reduce((sum, product) => sum + product.price * selectedProducts[product.id], 0);
    const gst = total * 0.18; // Assuming 18% GST
    const grandTotal = total + gst;
  
    return (
      <div className="rounded-lg shadow-md p-4 md:p-14 w-full lg:w-2/4">
        <h2 className="text-4xl font-bold text-red-600 mb-8">Your Cart</h2>
        {selectedProductDetails.length === 0 ? (
          <p className="text-red-500 font-extrabold text-center my-8 text-3xl md:text-5xl">Your Cart is Empty</p>
        ) : (
          selectedProductDetails.map((product) => (
            <div key={product.id} className="flex flex-col sm:flex-row justify-between items-center mb-5">
              <div className="flex items-center mb-3 md:mb-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden mr-4">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg md:text-xl font-bold text-white">{getShortName(product.name)}</h3>
                  <p className="text-gray-300 tracking-wider md:text-lg my-1">Price: ${product.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleUpdateQuantity(product.id, selectedProducts[product.id] - 1)}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
                >
                  -
                </button>
                <span className="text-xl font-semibold text-white">{selectedProducts[product.id]}</span>
                <button
                  onClick={() => handleUpdateQuantity(product.id, selectedProducts[product.id] + 1)}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveProduct(product.id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
        <div className="mt-8 md:mt-32 flex flex-col">
          <p className="text-3xl md:text-4xl text-gray-300 my-2 font-bold">Total:    <span className="text-2xl md:text-3xl text-gray-100">${total.toFixed(2)}</span></p>
          <p className="text-xl md:text-2xl font-bold my-2 text-gray-300">GST: ${gst.toFixed(2)}</p>
          <p className="text-red-500 text-3xl md:text-4xl border-t-2 py-2 my-4 font-semibold">Grand Total: ${grandTotal.toFixed(2)}</p>
        </div>
      </div>
    );
  };
  


  return (
    <div className="container mx-auto py-8 px-6 sm:px-2 ">
      <h1 className="text-3xl text-white font-bold mb-4">Products</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        {renderProductList()}
        {renderCart()}
      </div>
    </div>
  );
};

export default ProductPage;

