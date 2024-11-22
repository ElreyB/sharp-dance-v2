import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Organization } from '../../types/organizations';

interface MetaState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface OrganizationState {
  data: Organization[];
  meta: MetaState;
}

const initialState: OrganizationState = {
  data: [],
  meta: {
    status: 'idle',
    error: null,
  },
};

export const fetchOrganizations = createAsyncThunk<
  Organization[], // Return type
  void, // Argument type
  { rejectValue: string } // Rejection value type
>('organizations/fetchOrganizations', async (_, { rejectWithValue }) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'organizations'));
    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map((doc) => ({
      logo: doc.data().logo,
      organization: doc.data().organization,
    })) as Organization[];
  } catch (error) {
    return rejectWithValue('Failed to fetch organizations.');
  }
});

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.meta.status = 'loading';
        state.meta.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.meta.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.meta.status = 'failed';
        state.meta.error = action.payload ?? 'An unknown error occurred.';
      });
  },
});

export default organizationsSlice.reducer;
