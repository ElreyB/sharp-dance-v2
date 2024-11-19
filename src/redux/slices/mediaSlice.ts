import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Media } from '../../types/media';

interface MediaState {
  media: Media[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: MediaState = {
  media: [],
  status: 'idle',
  error: undefined,
};

export const fetchMedia = createAsyncThunk(
  'media/fetchMedia',
  async (): Promise<Media[]> => {
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
        images: doc.data().images || [],
        subtitle: doc.data().subtitle || '',
        title: doc.data().title || '',
        videos: doc.data().videos || [],
      })) as Media[];

      console.log('fetchMedia: Data fetched successfully:', {
        data,
      });

      return data;
    } catch (error) {
      console.error('fetchMedia: Error fetching data:', error);
      throw error;
    }
  }
);

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedia.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMedia.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.media = action.payload;
      })
      .addCase(fetchMedia.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default mediaSlice.reducer;
