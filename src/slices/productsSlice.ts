import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    updateProductQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const { id, quantity } = action.payload;
      const product = state.products.find(product => product.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
  },
});

export const { setLoading, addProduct, updateProductQuantity, removeProduct } = productsSlice.actions;

export default productsSlice.reducer;
