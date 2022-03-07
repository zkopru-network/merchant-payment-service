import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit'; // Importing from `utils` makes them more type-safe ✅
import { Inventory, InventoryState } from './types';
import inventoryData from '../../../demodata/inventories.json';
import { useInjectReducer } from 'redux-injectors';
import { truncate } from 'fs';
export const initialState: InventoryState = {
  data: inventoryData,
  firstModal: false,
  secondModal: false,
};

const slice = createSlice({
  name: 'inventories',
  initialState,
  reducers: {
    addInventory(state, action: PayloadAction<Inventory>) {
      console.log([...state.data, action.payload]);
      return {
        data: [...state.data, action.payload],
        firstModal: state.firstModal,
        secondModal: state.secondModal,
      };
    },
    removeInventory(state, action: PayloadAction<number>) {
      return {
        data: state.data.filter(item => item.id !== action.payload),
        firstModal: state.firstModal,
        secondModal: state.secondModal,
      };
    },
    openFirstModal(state) {
      return {
        data: state.data,
        firstModal: true,
        secondModal: state.secondModal,
      };
    },
    closeFirstModal(state) {
      return {
        data: state.data,
        firstModal: false,
        secondModal: state.secondModal,
      };
    },
    openSecondModal(state) {
      return {
        data: state.data,
        firstModal: state.firstModal,
        secondModal: true,
      };
    },
    closeSecondModal(state) {
      return {
        data: state.data,
        firstModal: state.firstModal,
        secondModal: false,
      };
    },
  },
});

export const { actions: balanceActions } = slice;

export const useInventorySlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
