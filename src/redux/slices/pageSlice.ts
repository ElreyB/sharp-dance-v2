import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Page } from '../../types/page';

interface State {
  page: Page | {};
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState: State = {
  page: {},
  status: 'idle',
  error: undefined,
};

export const fetchPage = createAsyncThunk(
  'page/fetchPage',
  async (page: string, { rejectWithValue }): Promise<Page> => {
    try {
      console.log('fetchPage: Started fetching data');
      const q = query(collection(db, 'pages'), where('pageName', '==', page));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('fetchPage: No documents found in collection');
        return {} as Page;
      }

      const dataArray = querySnapshot.docs.map((doc) => ({
        image: doc.data().image || {},
        images: doc.data().image || [],
        imgCredit: doc.data().imgCredit || '',
        options: doc.data().options || {},
        pageName: doc.data().pageName || '',
        subtitle: doc.data().subtitle || '',
        title: doc.data().title || '',
        vidoes: doc.data().vidoes || [],
      })) as Page[];

      const data = { ...dataArray[0] };
      console.log('fetchPage: Data fetched successfully:', { dataArray, data });
      return data;
    } catch (error) {
      console.error('fetchPage: Error fetching data:', error);
      throw error;
    }
  }
);

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPage.fulfilled, (state, action) => {
        console.log({ action });

        state.status = 'succeeded';
        state.page = action.payload;
      })
      .addCase(fetchPage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default pageSlice.reducer;
