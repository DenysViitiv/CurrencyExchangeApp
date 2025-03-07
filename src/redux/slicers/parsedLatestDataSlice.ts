import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {z} from 'zod';
import {requestLatestDataSchema} from '../../utils/zod/schemas';

interface ParsedLatestDataState {
  lastData: z.infer<typeof requestLatestDataSchema> | null;
}

const initialState: ParsedLatestDataState = {
  lastData: null,
};

const parsedLatestDataSlice = createSlice({
  name: 'parsedLatestData',
  initialState,
  reducers: {
    setParsedLatestData: (
      state,
      action: PayloadAction<z.infer<typeof requestLatestDataSchema>>,
    ) => {
      state.lastData = action.payload;
      return state;
    },

    resetParsedLatestData: state => {
      state.lastData = null;
      return state;
    },
  },
});

export const {setParsedLatestData, resetParsedLatestData} =
  parsedLatestDataSlice.actions;

export default parsedLatestDataSlice.reducer;
