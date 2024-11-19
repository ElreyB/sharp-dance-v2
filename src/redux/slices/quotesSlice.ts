import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Quote } from '../../types/quote';

interface QuoteState {
  quotes: Quote[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: QuoteState = {
  quotes: [],
  status: 'idle',
  error: undefined,
};

export const fetchQuotes = createAsyncThunk(
  'quotes/fetchQuotes',
  async (): Promise<Quote[]> => {
    try {
      console.log('fetchQuotes: Started fetching data');
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

      console.log('fetchQuotes: Data fetched successfully:', {
        data,
      });

      return data;
    } catch (error) {
      console.error('fetchQuotes: Error fetching data:', error);
      throw error;
    }
  }
);

const quotesSlice = createSlice({
  name: 'quites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.quotes = action.payload;
      })
      .addCase(fetchQuotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default quotesSlice.reducer;
