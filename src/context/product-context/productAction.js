export const getAllProductsStart = () => ({ type: "GET_ALL_PRODUCTS_START" });
export const getAllProductsSuccess = (products) => ({
  type: "GET_ALL_PRODUCTS_SUCCESS",
  payload: products,
});
export const getAllProductsFailed = (error) => ({
  type: "GET_ALL_PRODUCTS_FAILED",
  payload: error,
});

export const addProductStart = () => ({ type: "ADD_PRODUCT_START" });
export const addProductSuccess = (product) => ({
  type: "ADD_PRODUCT_SUCCESS",
  payload: product,
});
export const addProductFailed = (error) => ({
  type: "ADD_PRODUCT_FAILED",
  payload: error,
});


export const editProductsStart = () => ({ type: "EDIT_PRODUCT_START" });
export const editProductsSuccess = (products) => ({
  type: "EDIT_PRODUCT_SUCCESS",
  payload: products,
});
export const editProductsFailed = (error) => ({
  type: "EDIT_PRODUCT_FAILED",
  payload: error,
});


export const deleteProductStart = () => ({ type: "DELETE_PRODUCT_START" });
export const deleteProductSuccess = (product) => ({
  type: "DELETE_PRODUCT_SUCCESS",
  payload: product,
});
export const deleteProductFailed = (error) => ({
  type: "DELETE_PRODUCT_FAILED",
  payload: error,
});