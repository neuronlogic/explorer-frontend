import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an async thunk to fetch miners' data
export const getMiners = createAsyncThunk('leaderBoard/getMiners', async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/get-miners`);
  return response.data;
});

const minersAdapter = createEntityAdapter({
  // Assuming 'uid' is the unique identifier for each miner
  selectId: (miner) => miner.uid
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
    builder.addCase(getMiners.fulfilled, (state, action) => {
      minersAdapter.setAll(state, action.payload);
    });
  },
});

export const { setMinersSearchText } = minersSlice.actions;

export const { selectAll: selectMiners } = minersAdapter.getSelectors(
  (state) => state.leaderBoard.miners // Ensure this matches your slice name
);

export const selectMinersSearchText = ({ leaderBoard }) => leaderBoard.miners.searchText;


export default minersSlice.reducer;
