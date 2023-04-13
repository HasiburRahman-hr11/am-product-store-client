import React, { createContext, useReducer } from "react";
import productReducer from "./productReducer";


let initialState = {
  products: [],
  loadingProducts: false,
  error: null,
};

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        loadingProducts: state.loadingProducts,
        success: state.success,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
