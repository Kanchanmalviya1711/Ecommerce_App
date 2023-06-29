import {configureStore} from '@reduxjs/toolkit';
import LoginReducer from '../Auth/LoginSlice';
import allProductsReducer from '../features/allProductsSlice';
import detailProductReducer from '../features/ProductDetails/detailsSlice';
import wishListReducer from '../features/AddToCart/wishListSlice';
import cartReducer from '../features/AddToCart/cartSlice';

const store = configureStore({
  reducer: {
    token: LoginReducer,
    allProducts: allProductsReducer,
    productDetail: detailProductReducer,
    wishList: wishListReducer,
    addCart: cartReducer,
  },
});

export default store;
