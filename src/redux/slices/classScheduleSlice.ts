import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { ClassSchedule } from '../../types/classSchedule';

interface ClassScheduleState {
  data: ClassSchedule[];
  meta: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
}

const initialState: ClassScheduleState = {
  data: [],
  meta: {
    status: 'idle',
    error: null,
  },
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

const classScheduleSlice = createSlice({
  name: 'classSchedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.meta.status = 'loading';
        state.meta.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        const now = new Date().getTime();
        const isFuture = (time: number) => time > now;

        const upcomingClassSchedule = action.payload.map((classSchedule) => {
          const dates = classSchedule.dates.filter((date) => {
            const dateTime = new Date(date.days).getTime();
            return isFuture(dateTime);
          });

          return dates.length === 0
            ? { ...classSchedule }
            : { ...classSchedule, dates };
        });

        state.meta.status = 'succeeded';
        state.data = upcomingClassSchedule;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.meta.status = 'failed';
        state.meta.error = action.error.message || 'Failed to fetch classes';
      });
  },
});

export default classScheduleSlice.reducer;
