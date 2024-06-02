import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductAPI, removeProductAPI, updateProductQuantityAPI } from "../services/operations/productAPI";
import { products } from "../data";

import { AppDispatch, RootState } from "../services/operations/productAPI";

type Product = {
    id: number;
    name: string;
    price: number;
}

const ProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: RootState) => state.auth.token);


  const [selectedProducts, setSelectedProducts] = useState<{ [key: number]: number }>({});

  const handleAddProduct = async(product: Product) => {
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
    dispatch(updateProductQuantityAPI( productId, newQuantity, token ));
  };

  const handleRemoveProduct = (productId: any) => {
    
    const { [productId]: _, ...restSelectedProducts } = selectedProducts;
    setSelectedProducts(restSelectedProducts);

    dispatch(removeProductAPI( productId, token ));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">Price: ${product.price}</p>
            {selectedProducts[product.id] !== undefined ? (
              <div className="flex items-center space-x-2">
                <button onClick={() => handleUpdateQuantity(product.id, selectedProducts[product.id] - 1)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md">-</button>
                <span className="text-xl font-semibold">{selectedProducts[product.id]}</span>
                <button onClick={() => handleUpdateQuantity(product.id, selectedProducts[product.id] + 1)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md">+</button>;
                <button onClick={() => handleRemoveProduct(product.id)} 
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md">Remove</button>

              </div>
            ) : (
              <button onClick={() => handleAddProduct(product)} className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Add Product</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
