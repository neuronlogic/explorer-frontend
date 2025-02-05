import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../configs/envConfig';
// Define an async thunk to fetch miners' data

export const getMiners = createAsyncThunk(
  'leaderBoard/getMiners',
  async ({ selectedValidator, dataset }) => {
    const response = await axios.get(
      `${API_URL}/get-miners/${selectedValidator}?status=${dataset}`
    );
    return response.data;
  }
);

const minersAdapter = createEntityAdapter({
  selectId: (miner) => miner.uid,
});

const miners = createSlice({
  name: 'visualizer',
  initialState: minersAdapter.getInitialState({
    miner: null,
  }),
  reducers: {
    setMiner: {
      reducer: (state, action) => {
        state.miner = action.payload;
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMiners.fulfilled, (state, action) => {
        minersAdapter.setAll(state, action.payload);
      })
      .addCase(getMiners.rejected, (state, action) => {
        minersAdapter.setAll(state, []);
      });
  },
});

export const { setMiner } = miners.actions;

export const { selectAll: selectMiners } = minersAdapter.getSelectors(
  (state) => state.visualizer.miners // Ensure this matches your slice name
);

export const selectMiner = ({ visualizer }) => visualizer.miners.miner;

export default miners.reducer;
