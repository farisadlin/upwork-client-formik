import { appConstants } from "../constants";

export const initialState = {
  products: [],
};

const re = /([A-Z])\w*/g;

const appReducer = (state = initialState, action) => {
  // * Filtered Only Product Code
  const filteredProductCode = action?.payload?.map(
    (item) => item.productCode.match(re)[0]
  );

  //* Removed Duplicate Values in Filtered Only Product Code Array
  const removedDuplicatedArr = [...new Set(filteredProductCode)];

  //* Grouping Array By Product Code
  const filteredArr = [
    action?.payload?.reduce(function (r, a) {
      r[a.productCode.match(re)[0]] = r[a.productCode.match(re)[0]] || [];
      r[a.productCode.match(re)[0]].push(a);
      return r;
    }, Object.create(null)),
  ];

  //* Merged Array Into a Whole New List Array
  const newArr = removedDuplicatedArr?.map((firstItem) => ({
    listProducts: filteredArr[0][firstItem],
  }));

  switch (action.type) {
    case appConstants.UPLOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        // products: [...state.products, ...action.payload],
        products: newArr,
      };
    default:
      return state;
  }
};

export default appReducer;
