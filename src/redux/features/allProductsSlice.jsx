import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {ApiUrl} from '../../constants/Api';

export const testapi = createAsyncThunk('products/getproducts', async url => {
  try {
    const response = await axios.get(`${ApiUrl}/${url}`);
    console.log(response.data, 'responsedata');
    return response.data;
  } catch (error) {
    console.log(error, 'error');
    throw error; // Rethrow the error to propagate it to the rejected action
  }
});

const allProductsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    featuredValue: 'Lowest', // Change "featured_value" to "featuredValue" for consistency
  },

  reducers: {
    sorting: (state, action) => {
      const featuredValue = action.payload?.value ?? state.featuredValue;

      state.products.sort((a, b) => {
        if (featuredValue === 'Lowest') {
          return a.price - b.price;
        } else if (featuredValue === 'Highest') {
          return b.price - a.price;
        } else if (featuredValue === 'a-z') {
          return a.name.localeCompare(b.name);
        } else if (featuredValue === 'z-a') {
          return b.name.localeCompare(a.name);
        }
        return 0; // Return 0 for cases when "featuredValue" doesn't match any condition
      });
    },
  },

  extraReducers: builder => {
    builder.addCase(testapi.pending, (state, action) => {
      console.log('pending');
    });

    builder.addCase(testapi.fulfilled, (state, action) => {
      console.log('fulfilledxyz', action);
      state.products = action.payload;
    });

    builder.addCase(testapi.rejected, (state, action) => {
      console.log('reject');
    });
  },
});

export const {sorting} = allProductsSlice.actions;
export default allProductsSlice.reducer;
