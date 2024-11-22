import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Performance } from '../../types/performance';

interface MetaState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface PerformanceState {
  data: Performance[];
  meta: MetaState;
}

const initialState: PerformanceState = {
  data: [],
  meta: {
    status: 'idle',
    error: null,
  },
};

export const fetchPerformances = createAsyncThunk<
  Performance[], // Return type
  void, // Argument type
  { rejectValue: string } // Rejection value type
>('performances/fetchPerformances', async (_, { rejectWithValue }) => {
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
      $pathId: doc.data().pathId,
      pricing: doc.data().pricing,
      purchaseUrl: doc.data().purchaseUrl,
      website: doc.data().website,
    })) as Performance[];

    console.log('fetchPerformances: Data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('fetchPerformances: Error fetching data:', error);
    return rejectWithValue('Failed to fetch performances.');
  }
});

const performancesSlice = createSlice({
  name: 'performances',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerformances.pending, (state) => {
        state.meta.status = 'loading';
        state.meta.error = null;
      })
      .addCase(fetchPerformances.fulfilled, (state, action) => {
        state.meta.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPerformances.rejected, (state, action) => {
        state.meta.status = 'failed';
        state.meta.error = action.payload || 'An unknown error occurred.';
      });
  },
});

export default performancesSlice.reducer;
