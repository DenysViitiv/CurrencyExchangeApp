import {configureStore} from '@reduxjs/toolkit';
import parsedLatestDataReducer from './slicers/parsedLatestDataSlice';

const store = configureStore({
  reducer: {
    parsedLatestData: parsedLatestDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
