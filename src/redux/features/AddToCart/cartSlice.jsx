import {createSlice} from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cartItem',
  initialState: {
    cartItem: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const {product, color} = action.payload;
      const existItemIndex = state.cartItem.findIndex(
        data => data.id === product?.product?._id + color,
      );
      console.log(existItemIndex, 'existItemIndex');

      if (existItemIndex >= 0) {
        const updatedCartItem = state.cartItem.map((item, index) => {
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
          cartItem: updatedCartItem,
        };
      } else {
        const newItem = {
          id: product?.product?._id + color,
          name: product?.product?.name,
          price: product?.product?.price,
          color: color,
          image: product?.product?.image,
          cartQuantity: 1,
        };

        return {
          ...state,
          cartItem: [...state.cartItem, newItem],
        };
      }
    },

    IncreaseCart: (state, action) => {
      let itemIndexInc = state.cartItem.findIndex(
        data => data.id === action.payload.id,
      );
      if (itemIndexInc >= 0) {
        state.cartItem[itemIndexInc] = {
          ...state.cartItem[itemIndexInc],
          cartQuantity: state.cartItem[itemIndexInc]?.cartQuantity + 1,
        };
      } else {
        const Increment = {...action.payload, cartQuantity: 1};
        state.cartItem.push(Increment);
      }
    },

    decreaseCart: (state, action) => {
      let itemIndex = state.cartItem.findIndex(
        data => data.id === action.payload.id,
      );
      if (state.cartItem[itemIndex].cartQuantity > 1) {
        state.cartItem[itemIndex].cartQuantity -= 1;
      } else if (state.cartItem[itemIndex].cartQuantity === 1) {
        null;
      } else {
        null;
      }
    },

    remove: (state, action) => {
      const removeItem = state?.cartItem?.filter(
        item => item?.id !== action.payload,
      );
      state.cartItem = removeItem;
    },

    clearCart: (state, action) => {
      state.cartItem = [];
    },
    getTotal: (state, action) => {
      let {total, quantity} = state.cartItem.reduce(
        (cartTotal, cartItem) => {
          const {price, cartQuantity} = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          console.log(cartTotal, 'vcbxxxxxx');
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        },
      );
      total = parseFloat(total.toFixed(2));
      state.totalQuantity = quantity;
      state.totalAmount = parseFloat(total.toFixed(2));
    },
  },

  extraReducers: {},
});

export const {
  addToCart,
  remove,
  clearCart,
  decreaseCart,
  IncreaseCart,
  getTotal,
} = cartSlice.actions;
export default cartSlice.reducer;

// state.totalQuantity += 1;
// (state.totalAmount =
//   parseInt(state.totalAmount) + parseInt(action.payload.product.price)),
//   state.cartItem.push(action.payload.product);
