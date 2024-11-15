// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import classesReducer from './slices/classScheduleSlice';

const store = configureStore({
  reducer: {
    classSchedule: classesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
