import {createSlice} from '@reduxjs/toolkit';

export const wishListSlice = createSlice({
  name: 'productItem',
  initialState: {
    wishlistItem: [],
  },

  reducers: {
    // addtoWishList: (state, action) => {
    //   const existItem = state?.wishlistItem.findIndex(
    //     data => data?.id === action?.payload?.id,
    //   );

    //   if (existItem >= 0) {
    //     state.wishlistItem[existItem] = {
    //       ...state.wishlistItem[existItem],
    //       cartQuantity: state.wishlistItem[existItem]?.cartQuantity + 1,
    //     };
    //   } else {
    //     const aa = {...action.payload, cartQuantity: 1};
    //     state.wishlistItem.push(aa);
    //   }
    // },
    addtoWishList: (state, action) => {
      const {product, color} = action?.payload;
      const existItemIndex = state?.wishlistItem?.findIndex(
        data => data.id === product?.product?._id + color,
      );
      console.log(existItemIndex, 'existItemIndex');

      if (existItemIndex >= 0) {
        const updatedwishlistItem = state.wishlistItem.map((item, index) => {
          if (index === existItemIndex) {
            return {
              ...item,
              cartQuantity: item.cartQuantity + 1,
            };
          }
          return item;
        });

        return {
          ...state,
          wishlistItem: updatedwishlistItem,
        };
      } else {
        const newItem = {
          id: product?.product?._id + color,
          name: product?.product?.name,
          price: product?.product?.price,
          color: color,
          image: product?.product?.image,
          company: product?.product?.company,
          cartQuantity: 1,
        };

        return {
          ...state,
          wishlistItem: [...state.wishlistItem, newItem],
        };
      }
    },
    clearWishList: (state, action) => {
      state.wishlistItem = [];
    },
    removeWishlist: (state, action) => {
      const removeItem = state.wishlistItem.filter(
        item => item.id !== action.payload,
      );
      state.wishlistItem = removeItem;
    },
  },
});

export const {addtoWishList, clearWishList, removeWishlist} =
  wishListSlice.actions;
export default wishListSlice.reducer;
