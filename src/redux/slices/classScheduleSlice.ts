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
  'classSchedule/fetchClasses',
  async (): Promise<ClassSchedule[]> => {
    try {
      console.log('fetchClasses: Started fetching data');
      const querySnapshot = await getDocs(collection(db, 'classSchedule'));

      if (querySnapshot.empty) {
        console.log('fetchClasses: No documents found in collection');
        return [];
      }

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        location: doc.data().location,
        season: doc.data().season,
        time: doc.data().time,
        dates: doc.data().dates,
      })) as ClassSchedule[];

      console.log('fetchClasses: Data fetched successfully:', data);
      return data;
    } catch (error) {
      console.error('fetchClasses: Error fetching data:', error);
      throw error;
    }
  }
);

const classesSlice = createSlice({
  name: 'classSchedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        console.log({ action });
        const now = new Date().getTime();
        const isFuture = (time: number) => {
          return time > now;
        };
        const upcomingClassSchedule = action.payload.map((classSchedule) => {
          const dates = classSchedule.dates.filter((date) => {
            const dateTime = new Date(date.days).getTime();
            return isFuture(dateTime);
          });

          return dates.length === 0
            ? { ...classSchedule }
            : { ...classSchedule, dates };
        });
        state.status = 'succeeded';
        state.classSchedule = upcomingClassSchedule;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default classesSlice.reducer;
