import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Media } from '../../types/media';

interface MetaState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface MediaState {
  data: Media[] | null;
  meta: MetaState;
}

const initialState: MediaState = {
  data: null,
  meta: {
    status: 'idle',
    error: null,
  },
};

export const fetchMedia = createAsyncThunk<
  Media[], // Return type
  void, // Argument type
  { rejectValue: string } // Rejection value type
>('media/fetchMedia', async (_, { rejectWithValue }) => {
  try {
    console.log('fetchMedia: Started fetching data');
    const querySnapshot = await getDocs(collection(db, 'media'));

    if (querySnapshot.empty) {
      console.log('fetchMedia: No documents found in collection');
      return [];
    }

    const data = querySnapshot.docs.map((doc) => ({
      availableForPerformance: doc.data().availableForPerformance || '',
      availableForTour: doc.data().availableForTour || '',
      content: doc.data().content || '',
      id: doc.data().id || '',
      images: doc.data().images || [],
      subtitle: doc.data().subtitle || '',
      title: doc.data().title || '',
      videos: doc.data().videos || [],
    })) as Media[];

    console.log('fetchMedia: Data fetched successfully:', { data });

    return data;
  } catch (error) {
    console.error('fetchMedia: Error fetching data:', error);
    return rejectWithValue('Failed to fetch media data.');
  }
});

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state) => {
        state.meta.status = 'loading';
        state.meta.error = null;
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.meta.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        state.meta.status = 'failed';
        state.meta.error = action.payload ?? 'An unknown error occurred.';
      });
  },
});

export default mediaSlice.reducer;
