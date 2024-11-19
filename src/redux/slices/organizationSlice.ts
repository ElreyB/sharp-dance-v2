import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Organization } from '../../types/organizations';

interface OrganizationState {
  organizations: Organization[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: OrganizationState = {
  organizations: [],
  status: 'idle',
  error: undefined,
};

export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async (): Promise<Organization[]> => {
    try {
      console.log('fetchOrganizations: Started fetching data');
      const querySnapshot = await getDocs(collection(db, 'organizations'));

      if (querySnapshot.empty) {
        console.log('fetchOrganizations: No documents found in collection');
        return [];
      }

      const data = querySnapshot.docs.map((doc) => ({
        logo: doc.data().logo,
        organization: doc.data().organization,
      })) as Organization[];

      console.log('fetchOrganizations: Data fetched successfully:', {
        data,
      });

      return data;
    } catch (error) {
      console.error('fetchOrganizations: Error fetching data:', error);
      throw error;
    }
  }
);

const organizationSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.organizations = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default organizationSlice.reducer;
