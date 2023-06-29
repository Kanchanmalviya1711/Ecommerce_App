import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiUrl} from '../../../constants/Api';

export const detailApi = createAsyncThunk(
  'productdetail/getsingleproduct',
  async id => {
    try {
      const response = await axios.get(`${ApiUrl}/products/${id}`);
      const product = await response.data;
      console.log(product, 'data destails');
      return product;
    } catch (error) {
      console.log(error, 'error');
    }
  },
);

export const detailProductSlice = createSlice({
  name: 'productDetails',
  initialState: {
    product: {},
  },
  reducers: {
    singleproductdetails: (state, action) => {
      state.product = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(detailApi.pending, (state, action) => {
      console.log('pending');
    });

    builder.addCase(detailApi.fulfilled, (state, action) => {
      state.product = action.payload;
      console.log('successfully fetch d');
    });

    builder.addCase(detailApi.rejected, (state, action) => {
      console.log('reject');
    });
  },
});

export const {singleproductdetails} = detailProductSlice.actions;
export default detailProductSlice.reducer;
