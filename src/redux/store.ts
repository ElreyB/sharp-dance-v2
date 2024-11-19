// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import classesReducer from './slices/classScheduleSlice';
import pageReducer from './slices/pageSlice';
import mediaReducer from './slices/mediaSlice';
import organizatioinReducer from './slices/organizationSlice';
import performancesReducer from './slices/performancesSlice';

const store = configureStore({
  reducer: {
    classSchedule: classesReducer,
    page: pageReducer,
    media: mediaReducer,
    organizations: organizatioinReducer,
    performances: performancesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
