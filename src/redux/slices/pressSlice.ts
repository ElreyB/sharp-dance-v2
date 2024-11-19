import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Press } from '../../types/press';

interface PressState {
  press: Press[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: PressState = {
  press: [],
  status: 'idle',
  error: undefined,
};

export const fetchPress = createAsyncThunk(
  'press/fetchPress',
  async (): Promise<Press[]> => {
    try {
      console.log('fetchPress: Started fetching data');
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

      console.log('fetchPress: Data fetched successfully:', {
        data,
      });

      return data;
    } catch (error) {
      console.error('fetchPress: Error fetching data:', error);
      throw error;
    }
  }
);

const pressSlice = createSlice({
  name: 'press',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.press = action.payload;
      })
      .addCase(fetchPress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default pressSlice.reducer;
