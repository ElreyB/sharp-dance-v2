import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { Page } from '../../types/page';

interface MetaState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface PageState {
  data: Page | null;
  meta: MetaState;
}

const initialState: PageState = {
  data: null,
  meta: {
    status: 'idle',
    error: null,
  },
};

export const fetchPage = createAsyncThunk<
  Page, // Return type
  string, // Argument type
  { rejectValue: string } // Rejection value type
>('page/fetchPage', async (pageName, { rejectWithValue }) => {
  try {
    const q = query(collection(db, 'pages'), where('pageName', '==', pageName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {} as Page;
    }

    const [page] = querySnapshot.docs.map((doc) => ({
      image: doc.data().image || {},
      images: doc.data().image || [],
      imgCredit: doc.data().imgCredit || '',
      options: doc.data().options || {},
      pageName: doc.data().pageName || '',
      subtitle: doc.data().subtitle || '',
      title: doc.data().title || '',
      videos: doc.data().videos || [],
    })) as Page[];
    return page;
  } catch (error) {
    return rejectWithValue('Failed to fetch the page.');
  }
});

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPage.pending, (state) => {
        state.meta.status = 'loading';
        state.meta.error = null;
      })
      .addCase(fetchPage.fulfilled, (state, action) => {
        state.meta.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPage.rejected, (state, action) => {
        state.meta.status = 'failed';
        state.meta.error = action.payload ?? 'An unknown error occurred.';
      });
  },
});

export default pageSlice.reducer;
