import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.login || initialState;

export const selectLogin = createSelector([selectSlice], state => state);
