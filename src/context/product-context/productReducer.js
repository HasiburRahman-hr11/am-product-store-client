const productReducer = (state, action) => {
  switch (action.type) {
    // CREATE Product
    case "ADD_PRODUCT_START":
      return {
        products: state.products,
        loadingProducts: false,
        error: null,
      };

    case "ADD_PRODUCT_SUCCESS":
      return {
        products: [action.payload, ...state.products],
        loadingProducts: false,
        error: null,
      };

    case "ADD_PRODUCT_FAILED":
      return {
        products: state.products,
        loadingProducts: false,
        error: action.payload,
      };

    case "GET_ALL_PRODUCTS_START":
      return {
        products: state.products,
        loadingProducts: true,
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

    case "EDIT_PRODUCT_START":
      return {
        products: state.products,
        error: null,
        loadingProducts: true,
      };
    case "EDIT_PRODUCT_SUCCESS":
      return {
        // products: [action.payload, ...state.products.filter(data => data._id !== action.payload._id)],
        products: [...action.payload],
        error: null,
        loadingProducts: false,
      };
    case "EDIT_PRODUCT_FAILED":
      return {
        products: state.products,
        error: action.payload,
        loadingProducts: false,
      };

    case "DELETE_PRODUCT_START":
      return {
        products: state.products,
        error: null,
        loadingProducts: false,
      };
    case "DELETE_PRODUCT_SUCCESS":
      return {
        products: [
          ...state.products.filter((data) => data._id !== action.payload._id),
        ],
        error: null,
        loadingProducts: false,
      };
    case "DELETE_PRODUCT_FAILED":
      return {
        products: state.products,
        error: action.payload,
        loadingProducts: false,
      };

    default:
      return state;
  }
};

export default productReducer;
