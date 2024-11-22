import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Resources } from '../../types/resources';

interface MetaState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface ResourcesState {
  data: {
    staff: Resources[];
    performers: Resources[];
    apprentices: Resources[];
    guestPerformers: Resources[];
    board: Resources[];
    exboard: Resources[];
  } | null;
  meta: MetaState;
}

const initialState: ResourcesState = {
  data: null,
  meta: {
    status: 'idle',
    error: null,
  },
};

export const fetchResources = createAsyncThunk<
  ResourcesState['data'], // Return type
  void, // Argument type
  { rejectValue: string } // Rejection value type
>('resources/fetchResources', async (_, { rejectWithValue }) => {
  try {
    console.log('fetchResources: Started fetching data');
    const querySnapshot = await getDocs(collection(db, 'resources'));

    if (querySnapshot.empty) {
      console.log('fetchResources: No documents found in collection');
      return null;
    }

    // Group resources into categories
    const groupedData: ResourcesState['data'] = {
      staff: [],
      performers: [],
      apprentices: [],
      guestPerformers: [],
      board: [],
      exboard: [],
    };

    querySnapshot.docs.forEach((doc) => {
      const resource = {
        bio: doc.data().bio,
        director: doc.data().director,
        images: doc.data().images,
        imgCredit: doc.data().imgCredit,
        name: doc.data().name,
        role: doc.data().role,
        title: doc.data().title,
      } as Resources;

      if (doc.data().role === 'staff') {
        groupedData.staff.push(resource);
      } else if (doc.data().role === 'performer') {
        groupedData.performers.push(resource);
      } else if (doc.data().role === 'apprentice') {
        groupedData.apprentices.push(resource);
      } else if (doc.data().role === 'guestPerformer') {
        groupedData.guestPerformers.push(resource);
      } else if (doc.data().role === 'board') {
        groupedData.board.push(resource);
      } else if (doc.data().role === 'exboard') {
        groupedData.exboard.push(resource);
      }
    });

    console.log('fetchResources: Data fetched successfully:', groupedData);

    return groupedData;
  } catch (error) {
    console.error('fetchResources: Error fetching data:', error);
    return rejectWithValue('Failed to fetch resources.');
  }
});

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResources.pending, (state) => {
        state.meta.status = 'loading';
        state.meta.error = null;
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.meta.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.meta.status = 'failed';
        state.meta.error = action.payload ?? 'An unknown error occurred.';
      });
  },
});

export default resourcesSlice.reducer;
