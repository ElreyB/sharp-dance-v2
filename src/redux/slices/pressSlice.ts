import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Press } from '../../types/press';

interface MetaState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface PressState {
  data: Press[] | null;
  meta: MetaState;
}

const initialState: PressState = {
  data: null,
  meta: {
    status: 'idle',
    error: null,
  },
};

export const fetchPress = createAsyncThunk<
  Press[], // Return type
  void, // Argument type
  { rejectValue: string } // Rejection value type
>('press/fetchPress', async (_, { rejectWithValue }) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'press'));

    if (querySnapshot.empty) {
      console.log('fetchPress: No documents found in collection');
      return [];
    }

    const data = querySnapshot.docs.map((doc) => ({
      author: doc.data().author,
      date: doc.data().date,
      description: doc.data().description,
      image: doc.data().image,
      logo: doc.data().logo,
      outlet: doc.data().outlet,
      url: doc.data().url,
    })) as Press[];

    return data;
  } catch (error) {
    console.error('fetchPress: Error fetching data:', error);
    return rejectWithValue('Failed to fetch press data.');
  }
});

const pressSlice = createSlice({
  name: 'press',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPress.pending, (state) => {
        state.meta.status = 'loading';
        state.meta.error = null;
      })
      .addCase(fetchPress.fulfilled, (state, action) => {
        state.meta.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPress.rejected, (state, action) => {
        state.meta.status = 'failed';
        state.meta.error = action.payload ?? 'An unknown error occurred.';
      });
  },
});

export default pressSlice.reducer;
