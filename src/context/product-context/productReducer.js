const productReducer = (state, action) => {
  switch (action.type) {
    // CREATE Product
    case "ADD_NEW_PRODUCT_START":
      return {
        products: state.products,
        loadingProducts: false,
        error: null,
      };

    case "ADD_NEW_PRODUCT_SUCCESS":
      return {
        products: [...state.products, action.payload],
        loadingProducts: false,
        error: null,
      };

    case "ADD_NEW_PRODUCT_FAILED":
      return {
        products: state.products,
        loadingProducts: false,
        error: action.payload,
      };

    case "GET_ALL_PRODUCTS_START":
      return {
        products: state.products,
        loadingProducts: false,
        error: null,
      };

    case "GET_ALL_PRODUCTS_SUCCESS":
      return {
        products: action.payload,
        loadingProducts: false,
        error: null,
      };

    case "GET_ALL_PRODUCTS_FAILED":
      return {
        products: state.products,
        loadingProducts: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
