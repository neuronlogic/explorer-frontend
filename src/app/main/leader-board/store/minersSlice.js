import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../configs/envConfig';
// Define an async thunk to fetch miners' data
export const getMiners = createAsyncThunk('leaderBoard/getMiners', async (validatorId) => {
  const response = await axios.get(`${API_URL}/get-miners/${validatorId}`);
  return response.data;
});

const minersAdapter = createEntityAdapter({
  selectId: (miner) => miner.uid,
});

const minersSlice = createSlice({
  name: 'leaderBoard',
  initialState: minersAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setMinersSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMiners.fulfilled, (state, action) => {
        minersAdapter.setAll(state, action.payload);
      })
      .addCase(getMiners.rejected, (state, action) => {
        // If the request fails, set the miners to an empty array
        minersAdapter.setAll(state, []);
      });
  },
});

export const { setMinersSearchText } = minersSlice.actions;

export const { selectAll: selectMiners } = minersAdapter.getSelectors(
  (state) => state.leaderBoard.miners // Ensure this matches your slice name
);

export const selectMinersSearchText = ({ leaderBoard }) => leaderBoard.miners.searchText;

export default minersSlice.reducer;
