import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Resources } from '../../types/resources';

interface ResourcesState {
  resources: Resources[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: ResourcesState = {
  resources: [],
  status: 'idle',
  error: undefined,
};

export const fetchResources = createAsyncThunk(
  'quotes/fetchResources',
  async (): Promise<Resources[]> => {
    try {
      console.log('fetchResources: Started fetching data');
      const querySnapshot = await getDocs(collection(db, 'resources'));

      if (querySnapshot.empty) {
        console.log('fetchResources: No documents found in collection');
        return [];
      }

      const data = querySnapshot.docs.map((doc) => ({
        bio: doc.data().bio,
        director: doc.data().director,
        images: doc.data().images,
        imgCredit: doc.data().imgCredit,
        name: doc.data().name,
        role: doc.data().role,
        title: doc.data().title,
      })) as Resources[];

      console.log('fetchResources: Data fetched successfully:', {
        data,
      });

      return data;
    } catch (error) {
      console.error('fetchResources: Error fetching data:', error);
      throw error;
    }
  }
);

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.resources = action.payload;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default resourcesSlice.reducer;
