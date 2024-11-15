import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { ClassSchedule } from '../../types/classSchedule';

interface ClassesState {
  classSchedule: ClassSchedule[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: ClassesState = {
  classSchedule: [],
  status: 'idle',
  error: undefined,
};

export const fetchClasses = createAsyncThunk(
  'classes/fetchClasses',
  async (): Promise<ClassSchedule[]> => {
    const querySnapshot = await getDocs(collection(db, 'classSchedule'));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        location: data.location,
        season: data.season,
        time: data.time,
        dates: data.dates,
      } as ClassSchedule;
    });
  }
);

const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.classSchedule = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default classesSlice.reducer;
