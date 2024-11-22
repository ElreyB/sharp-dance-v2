import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Quote } from '../../types/quote';

interface MetaState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface QuoteState {
  data: Quote[] | null;
  meta: MetaState;
}

const initialState: QuoteState = {
  data: null,
  meta: {
    status: 'idle',
    error: null,
  },
};

export const fetchQuotes = createAsyncThunk<
  Quote[], // Return type
  void, // Argument type
  { rejectValue: string } // Rejection value type
>('quotes/fetchQuotes', async (_, { rejectWithValue }) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'quotes'));

    if (querySnapshot.empty) {
      console.log('fetchQuotes: No documents found in collection');
      return [];
    }

    const data = querySnapshot.docs.map((doc) => ({
      author: doc.data().author,
      quote: doc.data().quote,
      source: doc.data().source,
    })) as Quote[];

    return data;
  } catch (error) {
    console.error('fetchQuotes: Error fetching data:', error);
    return rejectWithValue('Failed to fetch quotes data.');
  }
});

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotes.pending, (state) => {
        state.meta.status = 'loading';
        state.meta.error = null;
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.meta.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchQuotes.rejected, (state, action) => {
        state.meta.status = 'failed';
        state.meta.error = action.payload ?? 'An unknown error occurred.';
      });
  },
});

export default quotesSlice.reducer;
