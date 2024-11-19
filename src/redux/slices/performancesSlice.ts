import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Performance } from '../../types/performance';

interface PerformanceState {
  performances: Performance[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: PerformanceState = {
  performances: [],
  status: 'idle',
  error: undefined,
};

export const fetchPerformances = createAsyncThunk(
  'performances/fetchPerformances',
  async (): Promise<Performance[]> => {
    try {
      console.log('fetchPerformances: Started fetching data');
      const querySnapshot = await getDocs(collection(db, 'performances'));

      if (querySnapshot.empty) {
        console.log('fetchPerformances: No documents found in collection');
        return [];
      }

      const data = querySnapshot.docs.map((doc) => ({
        address: doc.data().address,
        dates: doc.data().dates,
        description: doc.data().description,
        footnote: doc.data().footnote,
        location: doc.data().location,
        name: doc.data().name,
        pathId: doc.data().pathId,
        pricing: doc.data().pricing,
        purchaseUrl: doc.data().purchaseUrl,
        website: doc.data().website,
      })) as Performance[];

      console.log('fetchPerformances: Data fetched successfully:', {
        data,
      });

      return data;
    } catch (error) {
      console.error('fetchPerformances: Error fetching data:', error);
      throw error;
    }
  }
);

const performancesSlice = createSlice({
  name: 'performances',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerformances.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPerformances.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.performances = action.payload;
      })
      .addCase(fetchPerformances.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default performancesSlice.reducer;
