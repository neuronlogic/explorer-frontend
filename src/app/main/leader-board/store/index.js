import { combineReducers } from '@reduxjs/toolkit';
import miners from './minersSlice';

const reducer = combineReducers({
  miners,
});

export default reducer;
