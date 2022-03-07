import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit'; // Importing from `utils` makes them more type-safe ✅
import { Balance, BalanceState } from './types';
import balanceData from '../../../demodata/balances.json';
import { useInjectReducer } from 'redux-injectors';
export const initialState: BalanceState = { data: balanceData.coins };

const slice = createSlice({
  name: 'balances',
  initialState,
  reducers: {
    addBalanceData(state, action: PayloadAction<Balance>) {
      state = {
        data: [...state.data, action.payload],
      };
    },
  },
});

export const { actions: balanceActions } = slice;

export const useBalanceSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
